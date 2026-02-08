# Teste Final End-to-End - CV Analyzer

## 🎯 Objetivo
Testar todos os fluxos do sistema de ponta a ponta antes de colocar em produção.

---

## ⚠️ PRÉ-REQUISITOS

### 1. Banco de Dados Configurado
```bash
✅ Execute supabase_schema.sql no Supabase SQL Editor
✅ Verifique se tabelas 'users' e 'analyses' foram criadas
```

### 2. Servidor Rodando
```bash
npm run dev
# Deve estar em http://localhost:3000
```

### 3. (Opcional) Stripe Configurado
```bash
✅ Siga STRIPE_SETUP.md
✅ Stripe CLI rodando: stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

---

## 🧪 TESTE 1: Landing Page e Visual

### Passos:
1. Acesse http://localhost:3000
2. Role a página do topo ao final
3. Verifique cada seção

### Checklist Visual:
- [ ] **Header:** Logo "CV" + nome "CV Analyzer" + botão "Entrar"
- [ ] **Hero:** Título grande + Badge "Powered by AI" + Card de upload
- [ ] **Fonte:** Inter (não Geist ou Playfair) - legível e moderna
- [ ] **Cores:** Fundo cinza claro, cards cinza 100 (SEM bg-white)
- [ ] **Gradientes:** Purple/Pink em destaque (badges, botões, títulos)
- [ ] **Social Proof:** 3 estatísticas
- [ ] **Como Funciona:** 3 passos numerados
- [ ] **Features:** 5 cards (Formatação, Conteúdo, Palavras-chave, Experiência, Adequação)
- [ ] **Pricing:** 2 cards (Free e Pro) - Pro com borda roxa
- [ ] **FAQ:** 6 perguntas (accordion funcional)
- [ ] **Final CTA:** Fundo gradiente purple/pink
- [ ] **Footer:** Links funcionais

### Responsividade:
- [ ] Teste em mobile (F12 → Device toolbar)
- [ ] Teste em tablet
- [ ] Teste em desktop wide

✅ **Resultado Esperado:** Tudo visível, sem quebras de layout, cores consistentes

---

## 🧪 TESTE 2: Upload e Análise (Usuário NÃO LOGADO)

### Passos:
1. Limpe cookies (Ctrl+Shift+Delete)
2. Recarregue a página
3. Faça upload de um CV (PDF, DOCX ou TXT)
4. (Opcional) Cole descrição de vaga
5. Clique "Analisar Currículo"

### Durante Análise:
- [ ] Botão mostra "Analisando..." com spinner
- [ ] Botão fica desabilitado
- [ ] Upload card permanece visível

### Após Análise (< 30 segundos):
- [ ] **Score geral aparece** (círculo com número 0-100)
- [ ] **5 cards de dimensões** aparecem
- [ ] Cada card tem:
  - [ ] Ícone (emoji)
  - [ ] Nome da dimensão
  - [ ] Score individual (0-20)
  - [ ] Barra de progresso
  - [ ] Feedback textual
  - [ ] Sugestões (2-4 itens)
- [ ] **Sidebar direita:**
  - [ ] Prioridades (card laranja)
  - [ ] Pontos Fortes (card verde)
- [ ] **Botão "Nova Análise"** visível

### Console do Navegador (F12 → Console):
```
Fingerprint ... - Analyses count: 0
Analysis saved successfully!
```

✅ **Resultado Esperado:** Análise completa, resultados claros, sem erros

---

## 🧪 TESTE 3: Paywall (2ª Análise SEM LOGIN)

### Passos:
1. Clique em "Nova Análise"
2. Faça upload de outro CV
3. Clique "Analisar Currículo"

### Resultado Esperado:
- [ ] **Paywall aparece** (modal)
- [ ] Título: "Limite de análise atingido"
- [ ] Mensagem: "Você já usou sua análise gratuita. Crie uma conta..."
- [ ] Badge "Plano Pro" visível
- [ ] Lista de features Pro
- [ ] Botão: "Criar Conta Grátis"
- [ ] Análise NÃO é executada

### Console:
```
Fingerprint ... - Analyses count: 1
```

✅ **Resultado Esperado:** Paywall bloqueia 2ª análise corretamente

---

## 🧪 TESTE 4: Criar Conta (Signup)

### Opção A: Email/Senha

1. No paywall, clique "Criar Conta Grátis"
2. No modal, clique em "Criar conta" (tab superior)
3. Digite email válido
4. Digite senha (mín. 8 caracteres)
5. Clique "Criar conta"

**Resultado:**
- [ ] Mensagem: "Verifique seu email para confirmar o cadastro!"
- [ ] Email de confirmação chega
- [ ] Clique no link de confirmação
- [ ] Volte para a aplicação
- [ ] Clique "Entrar" e faça login

### Opção B: Google OAuth

1. No modal, clique "Continuar com Google"
2. Selecione conta Google
3. Autorize

**Resultado:**
- [ ] Redirect de volta para aplicação
- [ ] Header mostra seu email
- [ ] Botão "Sair" aparece

### Verificar no Supabase:
1. Vá em **Authentication** → **Users**
2. Seu usuário deve aparecer
3. Vá em **Table Editor** → **users**
4. Registro deve existir com:
   - [ ] `email` preenchido
   - [ ] `subscription_tier = 'free'`
   - [ ] `free_analyses_used = 0`

✅ **Resultado Esperado:** Conta criada, usuário logado, header atualizado

---

## 🧪 TESTE 5: Análise Logado (Free - 1ª vez)

### Passos:
1. (Logado) Faça upload de um CV
2. Clique "Analisar Currículo"
3. Aguarde análise

**Resultado:**
- [ ] Análise executa normalmente
- [ ] Resultados aparecem
- [ ] Sem paywall

### Console:
```
User seu@email.com - Tier: free, Analyses used: 0
Analysis saved successfully!
```

### Verificar no Supabase:
- Table **users**: `free_analyses_used = 1`
- Table **analyses**: 1 registro com seu `user_id`

✅ **Resultado Esperado:** Análise funciona, contador incrementa

---

## 🧪 TESTE 6: Paywall (2ª Análise LOGADO FREE)

### Passos:
1. Clique "Nova Análise"
2. Faça upload de outro CV
3. Clique "Analisar Currículo"

**Resultado:**
- [ ] **Paywall aparece**
- [ ] Título: "Desbloqueie análises ilimitadas"
- [ ] Mensagem: "Você já usou sua análise gratuita. Faça upgrade para Pro!"
- [ ] Badge "Plano Pro" com features
- [ ] Preço: R$ 39/mês
- [ ] Botão: "Fazer Upgrade para Pro"
- [ ] Análise NÃO executa

### Console:
```
User seu@email.com - Tier: free, Analyses used: 1
```

✅ **Resultado Esperado:** Paywall bloqueia usuário Free após 1 análise

---

## 🧪 TESTE 7: Botão "Assinar Pro" da Landing

### Passos:
1. Role até seção "Planos"
2. No card "Pro", clique "Assinar Pro"

**Caso NÃO logado:**
- [ ] Modal de login/signup aparece
- [ ] Após login, redireciona para checkout

**Caso logado:**
- [ ] Redireciona direto para Stripe Checkout

✅ **Resultado Esperado:** Botão funciona e redireciona corretamente

---

## 🧪 TESTE 8: Upgrade para Pro (Stripe)

### ⚠️ Requer Stripe configurado

### Passos:
1. No paywall OU na seção Pricing, clique "Fazer Upgrade para Pro"
2. Aguarde redirect para Stripe

**No Stripe Checkout:**
- [ ] Produto: "CV Analyzer Pro"
- [ ] Valor: R$ 39,00/mês
- [ ] Campo de cartão visível

**Preencher com Cartão de Teste:**
```
Número: 4242 4242 4242 4242
CVV: 123
Data: 12/28 (qualquer futura)
Nome: Seu Nome
CEP: 12345-678
```

3. Clique "Assinar"
4. Aguarde processamento
5. Você será redirecionado de volta

**Após Redirect:**
- [ ] Header mostra badge "Pro" (roxo/rosa)
- [ ] Email ainda visível
- [ ] Botão "Gerenciar" aparece
- [ ] Faça nova análise → DEVE FUNCIONAR (sem paywall)
- [ ] Faça mais análises → Todas funcionam (ilimitado)

### Verificar no Supabase:
- Table **users**: 
  - [ ] `subscription_tier = 'pro'`
  - [ ] `stripe_customer_id` preenchido
  - [ ] `stripe_subscription_id` preenchido
  - [ ] `subscription_status = 'active'`

### Verificar no Stripe Dashboard:
1. Vá em **Customers**
2. Seu email deve aparecer
3. Vá em **Subscriptions**
4. 1 assinatura ativa (R$ 39/mês)

✅ **Resultado Esperado:** Upgrade funciona, badge aparece, análises ilimitadas

---

## 🧪 TESTE 9: Customer Portal (Gerenciar Assinatura)

### Pré-requisito: Ser assinante Pro

### Passos:
1. Clique no badge "Pro" no header
   OU
2. Clique no botão "Gerenciar"

**Resultado:**
- [ ] Redirect para Stripe Customer Portal
- [ ] Mostra assinatura ativa
- [ ] Mostra método de pagamento
- [ ] Botão "Cancelar assinatura" visível
- [ ] Opção de atualizar cartão

### Teste Cancelar:
1. Clique "Cancelar assinatura"
2. Confirme cancelamento
3. Volte para a aplicação
4. Recarregue página (F5)

**Após Cancelar:**
- [ ] Badge "Pro" desaparece
- [ ] Botão "Gerenciar" desaparece
- [ ] Tente fazer análise → Paywall aparece

### Verificar no Supabase:
- Table **users**: `subscription_status = 'canceled'`

✅ **Resultado Esperado:** Portal funciona, cancelamento atualiza sistema

---

## 🧪 TESTE 10: Logout e Login

### Passos:
1. Clique "Sair" no header
2. Verifique que header volta ao estado inicial ("Entrar")
3. Clique "Entrar"
4. Faça login novamente

**Resultado:**
- [ ] Logout funciona
- [ ] Email some do header
- [ ] Login funciona
- [ ] Email volta
- [ ] Badge "Pro" volta (se era Pro)
- [ ] Estado persiste (limite de análises, etc)

✅ **Resultado Esperado:** Logout/Login funcionam, estado persiste

---

## 🧪 TESTE 11: Recuperação de Senha

### Passos:
1. Clique "Entrar"
2. Clique "Esqueceu sua senha?"
3. Digite email cadastrado
4. Clique "Enviar link"
5. Verifique email
6. Clique no link
7. Defina nova senha
8. Faça login com nova senha

**Resultado:**
- [ ] Email chega
- [ ] Link funciona
- [ ] Nova senha é aceita
- [ ] Login funciona

✅ **Resultado Esperado:** Recuperação funciona end-to-end

---

## 🐛 TROUBLESHOOTING

### Problema: "Erro ao verificar usuário"
**Causa:** Tabela `users` não existe  
**Solução:** Execute `supabase_schema.sql`

### Problema: Análises ilimitadas sem pagar
**Causa:** Controle de limites não funciona  
**Solução:** Veja `DEBUG_LIMITS.md`

### Problema: Badge Pro não aparece
**Causa:** Webhook não atualizou banco  
**Solução:** Execute SQL manual:
```sql
UPDATE users SET subscription_tier = 'pro' WHERE email = 'seu@email.com';
```

### Problema: Botão "Assinar Pro" não faz nada
**Causa:** Stripe não configurado OU erro no console  
**Solução:** 
1. Verifique console (F12)
2. Configure Stripe conforme `STRIPE_SETUP.md`

---

## ✅ CHECKLIST FINAL

### Funcionalidades Testadas:
- [ ] Landing page carrega corretamente
- [ ] Upload funciona (drag & drop + click)
- [ ] Análise por IA funciona (< 30s)
- [ ] Resultados aparecem formatados
- [ ] Limite 1 análise (não logado) funciona
- [ ] Signup funciona (email/senha E Google)
- [ ] Login funciona
- [ ] Limite 1 análise (logado free) funciona
- [ ] Paywall aparece corretamente
- [ ] Botão "Assinar Pro" funciona
- [ ] Checkout Stripe funciona
- [ ] Badge "Pro" aparece após pagamento
- [ ] Análises ilimitadas para Pro
- [ ] Customer Portal funciona
- [ ] Cancelamento funciona
- [ ] Logout funciona
- [ ] Recuperação de senha funciona

### Visual/UX:
- [ ] Fonte Inter legível
- [ ] Cores consistentes (sem bg-white)
- [ ] Gradientes purple/pink
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Loading states funcionam
- [ ] Mensagens de erro claras
- [ ] Sem erros no console

### Backend:
- [ ] Schema do banco executado
- [ ] RLS funcionando
- [ ] Triggers funcionando
- [ ] Webhooks funcionando (se Stripe configurado)
- [ ] Análises salvando no banco

---

## 🎉 RESULTADO FINAL

### Se TODOS os testes passaram:

**✅ PROJETO PRONTO PARA PRODUÇÃO!**

### Próximos passos:
1. Deploy na Vercel
2. Configurar Stripe em modo LIVE
3. Configurar domínio
4. Testar em produção
5. Lançar! 🚀

---

**Data do Teste:** _________  
**Testado por:** _________  
**Status:** ⬜ APROVADO  ⬜ REPROVADO  
**Observações:** _________
