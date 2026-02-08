# CV Analyzer - MVP Scope Definition

## Visão Geral

Este documento define claramente o que ESTÁ e o que NÃO ESTÁ no escopo do MVP (Minimum Viable Product) do CV Analyzer, com justificativas de priorização baseadas em impacto vs esforço.

---

## ✅ O QUE ESTÁ NO MVP

### MUST HAVE (Essencial - Sem isso não funciona)

#### 1. Landing Page Profissional
**O que é:** Página de apresentação do produto com foco em conversão

**Inclui:**
- Hero section com proposta de valor clara
- Seção "Como Funciona" (3 passos)
- Demo visual da análise
- Social proof (depoimentos, números)
- Seção de pricing (Free vs Pro)
- FAQ
- CTAs estratégicos

**Por quê é MUST:**
- Primeira impressão define se usuário testa ou não
- Diferencial competitivo está na apresentação superior
- Sem landing boa = sem conversão

**Esforço:** Alto | **Impacto:** Crítico

---

#### 2. Sistema de Upload de CV
**O que é:** Interface para upload de arquivos em múltiplos formatos

**Inclui:**
- Drag & drop
- Suporte para PDF, DOCX, TXT
- Validação de formato e tamanho (max 5MB)
- Extração de texto dos arquivos
- Feedback visual (loading states, erros)
- Storage temporário (Supabase Storage)

**Por quê é MUST:**
- Entrada de dados do produto
- Sem upload = sem análise = sem produto

**Esforço:** Médio | **Impacto:** Crítico

---

#### 3. Análise por IA em 5 Dimensões
**O que é:** Motor de análise usando Google Gemini API

**Inclui:**
- Análise nas 5 dimensões (Formatação, Conteúdo, Palavras-chave, Experiência, Adequação)
- Score individual por dimensão (0-20) + score total (0-100)
- Feedback escrito por dimensão
- 2-4 sugestões práticas por dimensão
- Lista de pontos fortes (3-5)
- Top 3 sugestões prioritárias
- Output estruturado em JSON

**Por quê é MUST:**
- Core value do produto
- Diferencial é a qualidade da análise
- Sem análise = sem produto

**Esforço:** Alto | **Impacto:** Crítico

---

#### 4. Dashboard de Resultados
**O que é:** Interface para exibir resultados da análise

**Inclui:**
- Score visual (círculo de progresso)
- Breakdown por dimensão (cards com scores)
- Sugestões priorizadas
- Design clean e fácil de entender
- Botão para nova análise

**Por quê é MUST:**
- Usuário precisa entender os resultados facilmente
- UX superior é nosso diferencial
- Apresentação ruim = produto ruim percebido

**Esforço:** Alto | **Impacto:** Crítico

---

#### 5. Sistema de Autenticação
**O que é:** Login e signup para controle de limites

**Inclui:**
- Signup com email + senha
- Login com Google OAuth
- Recuperação de senha
- Sessão persistente
- Supabase Auth

**Por quê é MUST:**
- Necessário para controlar limite de 1 análise free
- Necessário para identificar assinantes Pro
- Sem auth = não tem como cobrar

**Esforço:** Médio | **Impacto:** Crítico

---

#### 6. Controle de Limites (Paywall)
**O que é:** Sistema para bloquear após 1 análise gratuita

**Inclui:**
- Rastreamento de análises por usuário
- Bloqueio após 1ª análise (usuários free)
- Modal de paywall explicando plano Pro
- Badge "Pro" para assinantes
- Verificação no backend

**Por quê é MUST:**
- Sem paywall = não tem receita
- Define modelo de negócio do produto

**Esforço:** Baixo | **Impacto:** Crítico

---

#### 7. Integração com Stripe
**O que é:** Pagamentos recorrentes via Stripe

**Inclui:**
- Stripe Checkout (onboarding)
- Webhook para confirmar pagamento
- Atualização de `subscription_tier` após pagamento
- Plano único: Pro (R$ 39/mês)
- Stripe Customer Portal (gestão de assinatura)

**Por quê é MUST:**
- Única forma de monetizar
- Sem pagamento = sem negócio

**Esforço:** Médio | **Impacto:** Crítico

---

### SHOULD HAVE (Importante - Adiciona valor significativo)

#### 8. Reescrita Assistida por IA (Feature Killer Pro)
**O que é:** Ferramenta para reescrever seções do CV com IA

**Inclui:**
- Usuário seleciona seção do CV
- IA gera 3 versões reescritas (concisa, detalhada, focada em resultados)
- Usuário escolhe qual usar
- Disponível apenas para Pro

**Por quê é SHOULD:**
- Feature killer que justifica assinatura
- Diferencial competitivo claro
- Aumenta valor percebido do plano Pro

**Por quê não é MUST:**
- Produto funciona sem (análise já entrega valor)
- Pode ser adicionado pós-launch se time estiver apertado

**Esforço:** Médio | **Impacto:** Alto

**Decisão:** **Incluir no MVP** se timeline permitir (2 semanas extras)

---

### COULD HAVE (Desejável - Melhora experiência)

#### 9. Histórico de Análises
**O que é:** Lista de CVs analisados anteriormente

**Inclui:**
- Tabela com últimas 10 análises
- Ver resultado de análises passadas
- Download do arquivo original

**Por quê é COULD:**
- Nice to have para usuários Pro
- Facilita comparação de versões

**Por quê NÃO é prioritário:**
- Usuário pode refazer análise (não é limitante)
- Adiciona complexidade sem impacto direto na conversão

**Esforço:** Médio | **Impacto:** Baixo

**Decisão:** **Deixar para v1.1** (pós-MVP)

---

#### 10. Comparação com Descrição de Vaga
**O que é:** Analisar compatibilidade do CV com vaga específica

**Inclui:**
- Campo para colar descrição da vaga
- Score de match (0-100)
- Sugestões de ajustes para aumentar match

**Por quê é COULD:**
- Feature valiosa que diferencia ainda mais
- Aumenta utilidade do produto

**Por quê NÃO é prioritário:**
- Escopo grande (requer prompt engineering adicional)
- Validação do core já entrega valor

**Esforço:** Alto | **Impacto:** Médio

**Decisão:** **Deixar para v1.2** (após validar tração)

---

## ❌ O QUE NÃO ESTÁ NO MVP

### WON'T HAVE (Explicitamente fora do escopo v1)

#### 1. Categorização por Sub-Área (Front-end, Back-end, DevOps, etc.)
**Por quê NÃO:**
- Cada categoria requer prompt engineering específico
- Validação de qualidade multiplica esforço por N categorias
- MVP genérico "Tech/Dev" já atende 80% dos casos
- Pode ser adicionado após validar produto

**Quando adicionar:** v1.3 (após 500+ usuários)

---

#### 2. Análise "Rasa" no Plano Free
**Por quê NÃO:**
- Pivotamos para análise completa 1x free
- Análise "meia-boca" pode parecer produto ruim
- Melhor dar degustação completa e limitar quantidade

**Decisão:** Descartado definitivamente

---

#### 3. Templates de CV para Download
**Por quê NÃO:**
- Fora do core value (não é editor de CV)
- Mercado saturado de templates
- Adiciona complexidade sem diferencial

**Quando adicionar:** Talvez nunca (não é foco do produto)

---

#### 4. Integração com LinkedIn
**Por quê NÃO:**
- API do LinkedIn é complexa e cara
- Não é essencial para MVP
- Usuário pode fazer upload manual

**Quando adicionar:** v2.0 (se houver demanda clara)

---

#### 5. Exportar Análise em PDF
**Por quê NÃO:**
- Usuário pode screenshot ou copiar texto
- Não é bloqueante para usar o produto
- Baixo impacto na conversão

**Quando adicionar:** v1.2 (se usuários pedirem)

---

#### 6. Modo Multi-idioma (Inglês, Espanhol, etc.)
**Por quê NÃO:**
- MVP focado em Brasil (português)
- Internacionalização adiciona complexidade
- Validar mercado local primeiro

**Quando adicionar:** v2.0 (se tração for forte no BR)

---

#### 7. Mobile App Nativo
**Por quê NÃO:**
- Web responsiva atende mobile
- App nativo é 3x o esforço
- Não é esperado para esse tipo de produto

**Quando adicionar:** Provavelmente nunca

---

#### 8. Sistema de Referral/Afiliados
**Por quê NÃO:**
- Growth hack para depois de validar produto
- Requer sistema de créditos, tracking, pagamentos
- Complexidade prematura

**Quando adicionar:** v1.5 (após 1000+ usuários)

---

#### 9. Chat/Suporte ao Vivo
**Por quê NÃO:**
- Não escala no início
- FAQ + email de suporte são suficientes para MVP

**Quando adicionar:** v1.3 (se volume de suporte justificar)

---

#### 10. Análise de Perfil do LinkedIn
**Por quê NÃO:**
- Fora do escopo (foco é CV em arquivo)
- API do LinkedIn é limitada

**Quando adicionar:** v2.0+ (se pivotarmos para análise de presença online completa)

---

## Justificativa das Decisões de Escopo

### Framework Usado: Impacto vs Esforço

```
MUST HAVE: Alto Impacto + Qualquer Esforço (não negociável)
SHOULD HAVE: Alto Impacto + Esforço Razoável (entrar se der tempo)
COULD HAVE: Médio Impacto + Baixo Esforço (backlog priorizado)
WON'T HAVE: Baixo Impacto ou Alto Esforço sem validação
```

### Filosofia do MVP:

**Objetivo:** Validar 3 hipóteses principais em 3 meses

1. **Hipótese de Valor:** Profissionais de tech pagariam por análise de CV melhor que concorrentes?
2. **Hipótese de Crescimento:** Landing page + produto bom = conversão orgânica?
3. **Hipótese de Retenção:** Usuários Pro usam recorrentemente (churn < 10%)?

**Escopo mínimo para validar:**
- Landing que converte
- Análise de qualidade superior
- Paywall que monetiza

**Tudo que não é essencial para validar → fica de fora**

---

## Roadmap Pós-MVP

### v1.1 (Mês 2-3)
- Histórico de análises
- Melhorias baseadas em feedback de usuários
- Otimizações de performance

### v1.2 (Mês 4-5)
- Comparação com descrição de vaga
- Exportar análise em PDF
- Melhorias na reescrita assistida

### v1.3 (Mês 6-8)
- Categorização por sub-área (Front, Back, DevOps, etc.)
- Sistema de referral
- Integrações (LinkedIn scraping, etc.)

### v2.0 (Mês 9-12)
- Análise de presença online completa (LinkedIn, GitHub, etc.)
- Templates de CV
- Internacionalização (EN, ES)

---

## Métricas de Sucesso do MVP

### Critérios para considerar MVP validado:

**Tração:**
- ✅ 1000+ usuários testaram análise gratuita
- ✅ 50-100 assinantes Pro (5-10% conversão)
- ✅ Crescimento orgânico (>30% via word-of-mouth)

**Qualidade:**
- ✅ NPS > 50
- ✅ 80%+ dos usuários completam análise
- ✅ <5% de erros técnicos

**Retenção:**
- ✅ Churn < 10%/mês
- ✅ Uso recorrente (Pro faz 3+ análises/mês)

**Se atingir essas métricas em 3 meses → MVP validado → partir para v1.1**

---

## Checklist de Implementação (MVP)

### Fase 1: Foundation (Semana 1-2)
- [ ] Setup Next.js + Supabase + Tailwind
- [ ] Design system (shadcn/ui + cores + tipografia)
- [ ] Landing page estrutura
- [ ] Landing page conteúdo e otimização

### Fase 2: Core Features (Semana 3-5)
- [ ] Sistema de upload (drag & drop + validações)
- [ ] Extração de texto (PDF, DOCX, TXT)
- [ ] Integração Gemini API
- [ ] Prompt engineering para análise 5D
- [ ] Dashboard de resultados (UI completa)

### Fase 3: Auth & Monetization (Semana 6-7)
- [ ] Supabase Auth (email + Google)
- [ ] Controle de limites (1 análise free)
- [ ] Stripe Checkout
- [ ] Webhook de pagamento
- [ ] Stripe Customer Portal

### Fase 4: Polish & Launch (Semana 8-9)
- [ ] Reescrita assistida por IA (se der tempo)
- [ ] Testes end-to-end
- [ ] Otimizações de performance
- [ ] SEO básico
- [ ] Analytics (Plausible/GA4)

### Fase 5: Beta & Ajustes (Semana 10)
- [ ] Beta com 20-50 usuários
- [ ] Coleta de feedback
- [ ] Ajustes críticos
- [ ] Launch público

---

**Próximo passo:** Implementar seguindo este escopo. Qualquer adição deve ser justificada e re-priorizada.
