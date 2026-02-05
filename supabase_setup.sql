-- Tabela para controle de uso do CV Analyzer
-- Execute este SQL no Supabase SQL Editor

-- Criar tabela usage
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fingerprint TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  analysis_count INT DEFAULT 0,
  last_analysis_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índices para busca rápida
CREATE INDEX idx_usage_fingerprint ON usage(fingerprint);
CREATE INDEX idx_usage_ip_address ON usage(ip_address);

-- Habilitar Row Level Security (RLS)
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

-- Criar policy para permitir inserção anônima
CREATE POLICY "Allow anonymous insert" ON usage
  FOR INSERT TO anon
  WITH CHECK (true);

-- Criar policy para permitir leitura anônima
CREATE POLICY "Allow anonymous read" ON usage
  FOR SELECT TO anon
  USING (true);

-- Criar policy para permitir atualização anônima
CREATE POLICY "Allow anonymous update" ON usage
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);
