-- CV Analyzer - Database Schema
-- Execute este SQL no Supabase SQL Editor

-- ==========================================
-- 1. TABELA DE USUÁRIOS (estende auth.users)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
  free_analyses_used INTEGER NOT NULL DEFAULT 0,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index para buscar por email
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Index para buscar por stripe_customer_id
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON public.users(stripe_customer_id);

-- ==========================================
-- 2. TABELA DE ANÁLISES
-- ==========================================

CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  fingerprint TEXT, -- Para usuários não autenticados
  file_name TEXT NOT NULL,
  file_size INTEGER,
  job_description TEXT,
  result_json JSONB NOT NULL,
  overall_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index para buscar análises por usuário
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON public.analyses(user_id);

-- Index para buscar por fingerprint (usuários não autenticados)
CREATE INDEX IF NOT EXISTS idx_analyses_fingerprint ON public.analyses(fingerprint);

-- Index para ordenar por data
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON public.analyses(created_at DESC);

-- ==========================================
-- 3. TABELA DE CONTROLE DE LIMITES (LEGACY - mantida para compatibilidade)
-- ==========================================

-- Renomear tabela antiga 'usage' se existir
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'usage') THEN
    ALTER TABLE public.usage RENAME TO usage_legacy;
  END IF;
END $$;

-- ==========================================
-- 4. TRIGGERS PARA ATUALIZAR updated_at
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 5. FUNÇÃO PARA CRIAR USUÁRIO AUTOMATICAMENTE
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, subscription_tier, free_analyses_used)
  VALUES (NEW.id, NEW.email, 'free', 0)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar entrada na tabela users quando novo usuário se registra
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Políticas para USERS
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
CREATE POLICY "Users can view own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para ANALYSES
DROP POLICY IF EXISTS "Users can view own analyses" ON public.analyses;
CREATE POLICY "Users can view own analyses"
  ON public.analyses
  FOR SELECT
  USING (
    auth.uid() = user_id 
    OR user_id IS NULL -- Permitir visualizar análises sem usuário (por fingerprint)
  );

DROP POLICY IF EXISTS "Users can insert own analyses" ON public.analyses;
CREATE POLICY "Users can insert own analyses"
  ON public.analyses
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id 
    OR user_id IS NULL -- Permitir inserir análises sem usuário
  );

-- Permitir service_role fazer tudo (para API routes)
DROP POLICY IF EXISTS "Service role can do everything on users" ON public.users;
CREATE POLICY "Service role can do everything on users"
  ON public.users
  FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can do everything on analyses" ON public.analyses;
CREATE POLICY "Service role can do everything on analyses"
  ON public.analyses
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==========================================
-- 7. FUNÇÕES HELPER
-- ==========================================

-- Função para verificar se usuário atingiu limite de análises gratuitas
CREATE OR REPLACE FUNCTION public.check_user_analysis_limit(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  analyses_count INTEGER;
BEGIN
  -- Buscar tier do usuário
  SELECT subscription_tier INTO user_tier
  FROM public.users
  WHERE id = user_uuid;
  
  -- Se for Pro, sem limite
  IF user_tier = 'pro' THEN
    RETURN TRUE;
  END IF;
  
  -- Se for Free, verificar se já usou a análise gratuita
  SELECT free_analyses_used INTO analyses_count
  FROM public.users
  WHERE id = user_uuid;
  
  RETURN analyses_count < 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para incrementar contador de análises gratuitas
CREATE OR REPLACE FUNCTION public.increment_free_analyses(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.users
  SET free_analyses_used = free_analyses_used + 1
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- 8. COMENTÁRIOS E DOCUMENTAÇÃO
-- ==========================================

COMMENT ON TABLE public.users IS 'Tabela de usuários do CV Analyzer, estende auth.users do Supabase';
COMMENT ON TABLE public.analyses IS 'Histórico de análises de currículos realizadas';

COMMENT ON COLUMN public.users.subscription_tier IS 'Plano do usuário: free ou pro';
COMMENT ON COLUMN public.users.free_analyses_used IS 'Número de análises gratuitas já utilizadas';
COMMENT ON COLUMN public.users.stripe_customer_id IS 'ID do cliente no Stripe';
COMMENT ON COLUMN public.users.stripe_subscription_id IS 'ID da assinatura no Stripe';

COMMENT ON COLUMN public.analyses.fingerprint IS 'Fingerprint do navegador para usuários não autenticados';
COMMENT ON COLUMN public.analyses.result_json IS 'Resultado completo da análise em JSON';
COMMENT ON COLUMN public.analyses.overall_score IS 'Score geral (0-100) para consultas rápidas';

-- ==========================================
-- FIM DO SCHEMA
-- ==========================================

-- Verificação final
SELECT 'Schema criado com sucesso!' AS status;
