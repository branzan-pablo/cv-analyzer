# Debug - Controle de Limites

## ⚠️ Problema: Análises ilimitadas mesmo sem Stripe configurado

### Causa Provável:
A tabela `users` não foi criada no Supabase, então o sistema não consegue verificar o limite.

---

## ✅ Solução: Executar Schema do Banco

### Passo 1: Verificar se tabelas existem

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Table Editor**
4. Verifique se existem as tabelas:
   - ✅ `users`
   - ✅ `analyses`

Se NÃO existirem, continue para o Passo 2.

---

### Passo 2: Executar SQL Schema

1. Vá em **SQL Editor**
2. Clique em **New Query**
3. Cole todo o conteúdo do arquivo `supabase_schema.sql`
4. Clique em **Run** (ou pressione Ctrl+Enter)
5. Aguarde: "Schema criado com sucesso!"

---

### Passo 3: Verificar Dados

Após executar o schema:

1. Vá em **Table Editor** → **users**
2. Você deve ver suas colunas:
   - `id` (UUID)
   - `email` (TEXT)
   - `subscription_tier` (TEXT)
   - `free_analyses_used` (INTEGER)
   - `stripe_customer_id` (TEXT)
   - `stripe_subscription_id` (TEXT)
   - `subscription_status` (TEXT)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

---

### Passo 4: Testar Limite

**Teste 1: Usuário não autenticado**
1. Limpe cookies do navegador (Ctrl+Shift+Delete)
2. Acesse http://localhost:3000
3. Faça upload de um CV
4. Analise (deve funcionar - 1ª vez)
5. Tente analisar novamente → **Deve mostrar Paywall**

**Teste 2: Usuário autenticado (Free)**
1. Crie uma nova conta
2. Faça 1 análise (deve funcionar)
3. Tente fazer 2ª análise → **Deve mostrar Paywall**

**Teste 3: Usuário Pro (simulado)**
1. Vá em **SQL Editor** no Supabase
2. Execute:
   ```sql
   UPDATE users 
   SET subscription_tier = 'pro' 
   WHERE email = 'seu@email.com';
   ```
3. Recarregue a página
4. Badge "Pro" deve aparecer
5. Faça múltiplas análises → **Deve funcionar ilimitado**

---

## 🔍 Debug: Verificar o que está acontecendo

Se mesmo após criar as tabelas não funcionar:

### Ver logs no Console do Navegador:
1. Abra DevTools (F12)
2. Vá em **Console**
3. Faça uma análise
4. Procure por erros em vermelho

### Ver logs do servidor:
1. No terminal onde o Next.js está rodando
2. Procure por:
   - "Error fetching user"
   - "Error checking fingerprint"
   - "Error saving analysis"

---

## 📊 Consultas SQL Úteis para Debug

**Ver todos os usuários:**
```sql
SELECT id, email, subscription_tier, free_analyses_used 
FROM users;
```

**Ver todas as análises:**
```sql
SELECT id, user_id, fingerprint, file_name, created_at 
FROM analyses 
ORDER BY created_at DESC;
```

**Resetar limite de um usuário:**
```sql
UPDATE users 
SET free_analyses_used = 0 
WHERE email = 'seu@email.com';
```

**Deletar todas as análises (para testar do zero):**
```sql
DELETE FROM analyses;
```

---

## ✅ Checklist de Verificação

- [ ] Tabela `users` existe no Supabase
- [ ] Tabela `analyses` existe no Supabase
- [ ] Trigger `on_auth_user_created` existe
- [ ] RLS (Row Level Security) está habilitado
- [ ] Ao criar conta, registro é criado em `users` automaticamente
- [ ] Primeira análise funciona
- [ ] Segunda análise mostra Paywall
- [ ] Badge "Pro" aparece para usuários com `subscription_tier = 'pro'`

---

## 🚨 Se nada funcionar

Execute este SQL para ver o que está acontecendo:

```sql
-- Ver estrutura da tabela users
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users';

-- Ver policies de RLS
SELECT * FROM pg_policies WHERE tablename = 'users';

-- Ver triggers
SELECT trigger_name, event_manipulation, action_statement 
FROM information_schema.triggers 
WHERE event_object_table = 'users';
```

E compartilhe o resultado para análise.
