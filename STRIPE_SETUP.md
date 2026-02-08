# Stripe Setup - CV Analyzer

## 📋 Passo a Passo para Configurar o Stripe

### 1. Criar Conta no Stripe

1. Acesse: https://dashboard.stripe.com/register
2. Crie sua conta
3. Ative o **Modo de Teste** (toggle no canto superior direito)

---

### 2. Obter API Keys

1. Vá em **Developers** → **API keys**
2. Copie as chaves de **teste**:
   - **Publishable key** (começa com `pk_test_`)
   - **Secret key** (começa com `sk_test_`)
3. Cole no arquivo `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

---

### 3. Criar Produto e Preço

1. Vá em **Products** → **Add product**
2. Configure:
   - **Name:** CV Analyzer Pro
   - **Description:** Análises ilimitadas + Reescrita assistida por IA
   - **Pricing model:** Standard pricing
   - **Price:** R$ 39,00 (ou 39 BRL)
   - **Billing period:** Monthly (Recorrente mensal)
   - **Payment type:** Recurring

3. Clique em **Save product**
4. Copie o **Price ID** (começa com `price_`)
5. Cole no `.env.local`:
   ```
   STRIPE_PRICE_ID_PRO_MONTHLY=price_...
   ```

---

### 4. Configurar Webhook (Para receber confirmação de pagamento)

#### 4.1. Usando Stripe CLI (Desenvolvimento Local)

**Instalar Stripe CLI:**
- **Windows:** `winget install stripe`
- **Mac:** `brew install stripe/stripe-cli/stripe`
- **Linux:** https://stripe.com/docs/stripe-cli

**Fazer login:**
```bash
stripe login
```

**Escutar webhooks localmente:**
```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

O comando vai gerar um **webhook secret** (começa com `whsec_`). Copie e cole no `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Manter rodando:** Deixe esse comando rodando em um terminal separado enquanto desenvolve.

---

#### 4.2. Para Produção (Após Deploy)

1. Vá em **Developers** → **Webhooks**
2. Clique em **Add endpoint**
3. Configure:
   - **Endpoint URL:** `https://seu-dominio.com/api/webhooks/stripe`
   - **Events to send:**
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
4. Copie o **Signing secret** e adicione no `.env.local` de produção

---

### 5. Testar Pagamento

Use cartões de teste do Stripe:
- **Sucesso:** `4242 4242 4242 4242`
- **Falha (cartão recusado):** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

**CVV:** Qualquer 3 dígitos  
**Data de validade:** Qualquer data futura  
**CEP:** Qualquer

---

### 6. Customer Portal (Gerenciar Assinatura)

1. Vá em **Settings** → **Billing** → **Customer portal**
2. Clique em **Activate test link**
3. Configure:
   - Permitir cancelamento de assinatura
   - Permitir atualização de método de pagamento
4. Salve

O portal está pronto! Usuários poderão gerenciar suas assinaturas automaticamente.

---

### 7. Checklist Final

- [ ] Chaves de API no `.env.local`
- [ ] Produto criado no Stripe
- [ ] Price ID configurado
- [ ] Webhook secret configurado
- [ ] Stripe CLI rodando (desenvolvimento)
- [ ] Customer Portal ativado

---

### 8. Variáveis de Ambiente Completas

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_PRICE_ID_PRO_MONTHLY=price_1...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

### 9. Modo Produção

Quando for para produção:
1. **Desative o modo de teste** no Stripe Dashboard
2. Copie as chaves de **produção** (`pk_live_` e `sk_live_`)
3. Atualize o `.env.local` de produção com as chaves live
4. Configure webhook para o domínio de produção

---

## 🎯 Próximos Passos Após Configurar

Depois de configurar o Stripe:
1. Reinicie o servidor Next.js
2. Teste o fluxo de pagamento
3. Verifique webhooks sendo recebidos
4. Confirme que assinatura foi criada no Stripe Dashboard

**Documentação Oficial:** https://stripe.com/docs
