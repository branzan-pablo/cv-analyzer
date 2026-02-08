# CV Analyzer - Guia de Teste Completo

## 🎯 Objetivo

Este guia vai te ajudar a testar todas as funcionalidades do CV Analyzer antes de colocar em produção.

---

## ⚠️ PRÉ-REQUISITOS CRÍTICOS

### 1. Executar Schema do Banco de Dados

**IMPORTANTE:** Se você pular isso, nada vai funcionar!

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: `llyonjvanfrhycwbneey`
3. Vá em **SQL Editor**
4. Clique em **New Query**
5. Cole TODO o conteúdo do arquivo `supabase_schema.sql`
6. Clique em **Run** (Ctrl+Enter)
7. Aguarde a mensagem: "Schema criado com sucesso!"

**Verifique se funcionou:**

- Vá em **Table Editor**
- Você deve ver as tabelas: `users` e `analyses`

---

### 2. Configurar Stripe (Para testar pagamentos)

**Opção A: Configuração Completa (Recomendado)**

- Siga o guia completo em `STRIPE_SETUP.md` (9 passos)

**Opção B: Testar Sem Stripe (Temporário)**

- Você pode testar autenticação e limites sem configurar Stripe
- O botão "Fazer Upgrade" vai dar erro, mas o resto funciona

---

## 🧪 PLANO DE TESTES

### Teste 1: Landing Page

**Objetivo:** Verificar se todas as seções estão visíveis e bem formatadas.

**Passos:**

1. Acesse: http://localhost:3000
2. Role a página do topo ao fim
3. Verifique cada seção:

**Checklist Visual:**

- [ ] Header com logo "CV" e botão "Entrar"
- [ ] Hero Section com título grande e gradiente purple/pink
- [ ] Card de upload à direita com campo de descrição da vaga
- [ ] Social Proof Bar com 3 estatísticas
- [ ] Seção "Como Funciona" com 3 passos
- [ ] Seção "5 Dimensões de Análise" (5 cards)
- [ ] Seção "Planos" (Free vs Pro)
- [ ] FAQ com 6 perguntas (accordion)
- [ ] Final CTA com fundo gradiente
- [ ] Footer com links

**Cores:**

- [ ] Fundo geral: Cinza claro (#f6f6f6)
- [ ] Cards: Cinza 100 (#e7e7e7) - SEM bg-white
- [ ] Texto principal: Cinza escuro
- [ ] Destaques: Gradiente purple/pink

---

### Teste 2: Upload e Análise (Sem Login)

**Objetivo:** Testar primeira análise gratuita sem autenticação.

**Passos:**

1. Limpe cookies do navegador (Ctrl+Shift+Delete)
2. Acesse: http://localhost:3000
3. Faça upload de um CV (PDF, DOCX ou TXT)
4. (Opcional) Cole uma descrição de vaga
5. Clique em "Analisar Currículo"

**Checklist:**

- [ ] Upload aceita drag & drop
- [ ] Upload aceita click to select
- [ ] Loading aparece durante análise
- [ ] Análise completa em < 30 segundos
- [ ] Resultado mostra:
  - [ ] Score geral (círculo com gradiente)
  - [ ] 5 cards de dimensões
  - [ ] Prioridades (sidebar laranja)
  - [ ] Pontos Fortes (sidebar verde)
  - [ ] Botão "Nova Análise"

**Verificar no Console do Navegador (F12):**

```
Fingerprint ... - Analyses count: 0
Analysis saved successfully!
```

---

### Teste 3: Limite de Análises (Sem Login)

**Objetivo:** Verificar se paywall aparece na segunda análise.

**Passos:**

1. (Após Teste 2) Clique em "Nova Análise"
2. Faça upload de outro CV
3. Clique em "Analisar Currículo"

**Resultado Esperado:**

- [ ] **Paywall deve aparecer** com:
  - [ ] Título: "Limite de análise atingido"
  - [ ] Mensagem: "Você já usou sua análise gratuita. Crie uma conta..."
  - [ ] Botão: "Criar Conta Grátis"
- [ ] Análise NÃO deve ser executada

**Verificar no Console:**

```
Fingerprint ... - Analyses count: 1
```

**Se não funcionar:**

- Verifique se executou `supabase_schema.sql`
- Veja `DEBUG_LIMITS.md` para resolver

---

### Teste 4: Cadastro de Usuário

**Objetivo:** Criar conta e testar autenticação.

**Passos:**

1. No Paywall, clique em "Criar Conta Grátis"
2. No modal que abrir, clique em "Criar conta"
3. Escolha um dos métodos:

**Opção A: Email/Senha**

1. Digite seu email
2. Digite uma senha (mín. 8 caracteres)
3. Clique em "Criar conta"
4. **IMPORTANTE:** Verifique sua caixa de email
5. Clique no link de confirmação
6. Volte para a aplicação e faça login

**Opção B: Google OAuth**

1. Clique em "Continuar com Google"
2. Selecione sua conta Google
3. Autorize a aplicação

**Checklist:**

- [ ] Modal de autenticação aparece
- [ ] Email de confirmação chega (se usar email/senha)
- [ ] Após login, header mostra seu email
- [ ] Header mostra botão "Sair"

**Verificar no Supabase:**

1. Vá em **Authentication** → **Users**
2. Seu usuário deve aparecer na lista

---

### Teste 5: Análise com Usuário Free

**Objetivo:** Verificar limite de 1 análise para usuário autenticado.

**Passos:**

1. (Logado) Faça upload de um CV
2. Clique em "Analisar Currículo"
3. Aguarde análise completar ✅
4. Clique em "Nova Análise"
5. Faça upload de outro CV
6. Clique em "Analisar Currículo"

**Resultado Esperado:**

- [ ] **Paywall deve aparecer** com:
  - [ ] Título: "Desbloqueie análises ilimitadas"
  - [ ] Mensagem: "Você já usou sua análise gratuita. Faça upgrade..."
  - [ ] Botão: "Fazer Upgrade para Pro"
  - [ ] Badge "Plano Pro" com features listadas

**Verificar no Console:**

```
User seu@email.com - Tier: free, Analyses used: 0
Analysis saved successfully!
User seu@email.com - Tier: free, Analyses used: 1
```

**Verificar no Supabase:**

1. Vá em **Table Editor** → **users**
2. Sua linha deve ter `free_analyses_used = 1`

---

### Teste 6: Upgrade para Pro (Stripe)

**⚠️ Só funciona se você configurou Stripe (ver `STRIPE_SETUP.md`)**

**Passos:**

1. No Paywall, clique em "Fazer Upgrade para Pro"
2. Você será redirecionado para Stripe Checkout

**Usar Cartão de Teste:**

- Número: `4242 4242 4242 4242`
- CVV: `123`
- Data: Qualquer futura (ex: 12/25)
- Nome: Qualquer
- CEP: Qualquer

3. Preencha e clique em "Assinar"
4. Aguarde confirmação
5. Você será redirecionado de volta

**Checklist:**

- [ ] Checkout do Stripe abre
- [ ] Valor: R$ 39,00/mês
- [ ] Pagamento processa com sucesso
- [ ] Redirect para homepage
- [ ] **Badge "Pro" aparece no header**
- [ ] Botão "Gerenciar" aparece no header
- [ ] Faça múltiplas análises → Deve funcionar ilimitado

**Verificar no Supabase:**

1. Tabela `users` → `subscription_tier` deve ser `'pro'`
2. Deve ter `stripe_customer_id` preenchido

**Verificar no Stripe Dashboard:**

1. Vá em **Customers** → Seu email deve aparecer
2. Vá em **Subscriptions** → Deve ter 1 assinatura ativa

---

### Teste 7: Customer Portal (Gerenciar Assinatura)

**Pré-requisito:** Ser assinante Pro (Teste 6)

**Passos:**

1. Clique no badge "Pro" no header
2. OU clique no botão "Gerenciar"
3. Você será redirecionado para o Stripe Customer Portal

**Checklist:**

- [ ] Portal abre
- [ ] Mostra sua assinatura ativa
- [ ] Mostra método de pagamento
- [ ] Tem botão "Cancelar assinatura"
- [ ] Tem opção de atualizar cartão

**Teste cancelar:**

1. Clique em "Cancelar assinatura"
2. Confirme
3. Volte para a aplicação
4. Recarregue a página
5. Badge "Pro" deve desaparecer
6. Tente fazer análise → Paywall deve aparecer

---

### Teste 8: Logout e Login Novamente

**Passos:**

1. Clique em "Sair" no header
2. Você deve ser deslogado
3. Clique em "Entrar"
4. Faça login com suas credenciais

**Checklist:**

- [ ] Logout funciona (email some do header)
- [ ] Login com email/senha funciona
- [ ] Login com Google funciona
- [ ] Após login, dados persistem (badge Pro, limite, etc)

---

### Teste 9: Recuperação de Senha

**Passos:**

1. Clique em "Entrar"
2. Clique em "Esqueceu sua senha?"
3. Digite seu email
4. Clique em "Enviar link"
5. Verifique seu email
6. Clique no link
7. Defina nova senha

**Checklist:**

- [ ] Email de recuperação chega
- [ ] Link funciona
- [ ] Nova senha é aceita
- [ ] Consegue fazer login com nova senha

---

### Teste 10: Responsividade Mobile

**Passos:**

1. Abra DevTools (F12)
2. Clique no ícone de dispositivo móvel (Ctrl+Shift+M)
3. Selecione "iPhone 12 Pro" ou similar
4. Navegue pela página

**Checklist:**

- [ ] Header adapta (email escondido em telas pequenas)
- [ ] Hero section empilha (texto em cima, upload embaixo)
- [ ] Cards de features em 1 coluna
- [ ] Pricing em 1 coluna
- [ ] FAQ abre/fecha corretamente
- [ ] Modal de auth cabe na tela
- [ ] Paywall cabe na tela

---

## 🐛 TROUBLESHOOTING

### Problema: "Erro ao verificar usuário"

**Causa:** Tabela `users` não existe.

**Solução:**

1. Execute `supabase_schema.sql` no Supabase SQL Editor
2. Verifique se tabelas foram criadas em **Table Editor**

---

### Problema: Análises ilimitadas mesmo sem pagar

**Causa:** Controle de limites não está funcionando.

**Debugging:**

1. Abra Console do navegador (F12)
2. Procure por logs:
   - "User ... - Tier: free, Analyses used: X"
   - "Fingerprint ... - Analyses count: X"
3. Se não aparecer, problema está na API

**Solução:**

- Veja `DEBUG_LIMITS.md` para instruções detalhadas
- Execute `supabase_schema.sql` se não executou

---

### Problema: Webhook do Stripe não funciona

**Causa:** Stripe CLI não está rodando.

**Solução:**

1. Instale Stripe CLI (ver `STRIPE_SETUP.md`)
2. Execute em um terminal separado:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```
3. Copie o `whsec_` gerado e cole em `.env.local`
4. Reinicie o servidor Next.js

---

### Problema: Badge "Pro" não aparece após pagar

**Causa:** Webhook não atualizou o banco.

**Solução Manual:**

1. Vá no Supabase SQL Editor
2. Execute:
   ```sql
   UPDATE users
   SET subscription_tier = 'pro'
   WHERE email = 'seu@email.com';
   ```
3. Recarregue a página

---

## ✅ CHECKLIST FINAL ANTES DE PRODUÇÃO

### Backend:

- [ ] Schema do banco executado
- [ ] RLS (Row Level Security) habilitado
- [ ] Triggers funcionando
- [ ] Políticas de acesso configuradas

### Stripe (se for usar):

- [ ] Produto criado
- [ ] Preço configurado (R$ 39/mês)
- [ ] Webhook configurado para produção
- [ ] Customer Portal ativado
- [ ] Chaves de PRODUÇÃO no `.env` (não teste!)

### Variáveis de Ambiente:

- [ ] `.env.local` preenchido corretamente
- [ ] Chaves do Supabase corretas
- [ ] Chave do Gemini válida
- [ ] Chaves do Stripe (se usar)

### Funcionalidades:

- [ ] Upload funciona
- [ ] Análise funciona
- [ ] Limite de 1 análise (não logado) funciona
- [ ] Limite de 1 análise (logado free) funciona
- [ ] Cadastro funciona
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Paywall aparece corretamente
- [ ] Upgrade para Pro funciona (se Stripe configurado)
- [ ] Badge "Pro" aparece
- [ ] Análises ilimitadas para Pro
- [ ] Customer Portal funciona

### UI/UX:

- [ ] Cores corretas (sem bg-white)
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Loading states em todos os botões
- [ ] Mensagens de erro claras
- [ ] Sem erros no console do navegador

---

## 🚀 DEPLOY

Após todos os testes passarem:

1. **Faça commit do código:**

   ```bash
   git add .
   git commit -m "feat: implementa CV Analyzer completo com auth, limites e Stripe"
   git push
   ```

2. **Deploy na Vercel:**
   - Conecte o repositório na Vercel
   - Configure variáveis de ambiente de PRODUÇÃO
   - Deploy!

3. **Configure webhook do Stripe para produção:**
   - URL: `https://seu-dominio.vercel.app/api/webhooks/stripe`
   - Copie novo webhook secret
   - Atualize variável de ambiente na Vercel

4. **Teste em produção:**
   - Repita os testes principais
   - Use cartões de teste do Stripe

---

**Pronto! 🎉 Seu CV Analyzer está completo e testado!**
