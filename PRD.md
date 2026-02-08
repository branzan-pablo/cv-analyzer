# CV Analyzer - Product Requirements Document (PRD)

## Visão Geral do Produto

CV Analyzer é uma plataforma SaaS que utiliza IA para analisar currículos de profissionais de tecnologia, fornecendo feedback detalhado e acionável em 5 dimensões críticas, ajudando usuários a aumentarem suas chances em processos seletivos.

**Versão:** 1.0 (MVP)  
**Última Atualização:** Fevereiro 2026

---

## Personas

### Persona 1: Lucas - Dev Júnior em Busca do Primeiro Emprego

**Perfil:**
- 23 anos, recém-formado em Ciência da Computação
- Fez bootcamp de React
- Tem projetos pessoais mas zero experiência profissional
- Já enviou 50+ currículos, teve 2 entrevistas

**Dores:**
- Não sabe se o CV está "bom o suficiente"
- Inseguro sobre o que destacar sem experiência
- CV é rejeitado por ATS antes de chegar em humanos
- Não sabe quais palavras-chave usar

**Job to be Done:**
"Preciso que meu CV passe pelos filtros automáticos e mostre meu potencial mesmo sem experiência formal"

**Resultado Ideal:**
CV otimizado que destaca projetos, skills e potencial, aumentando callbacks de 4% para 15%

---

### Persona 2: Marina - Dev Pleno Buscando Upgrade

**Perfil:**
- 28 anos, 4 anos de experiência como front-end
- Quer migrar para posições sênior ou empresas maiores (FAANG, unicórnios)
- CV desatualizado, muito técnico, sem storytelling

**Dores:**
- CV parece "mais do mesmo", não se destaca
- Não sabe como quantificar impacto do trabalho
- Empresas top nem chamam para entrevista
- Incerteza se está vendendo mal suas conquistas

**Job to be Done:**
"Preciso transformar meu CV técnico em algo que mostre impacto e me diferencie para vagas competitivas"

**Resultado Ideal:**
CV que conta uma história de evolução, destaca resultados mensuráveis e abre portas para empresas tier 1

---

### Persona 3: Roberto - Dev Sênior Indo para Vagas Internacionais

**Perfil:**
- 35 anos, 10+ anos de experiência
- Tech lead, quer remote jobs internacionais
- CV brasileiro tradicional, não adaptado para mercado global

**Dores:**
- CV em formato BR não funciona no exterior
- Difícil traduzir contexto de empresas brasileiras
- Competindo com candidatos globais
- Não sabe o que recrutadores gringos esperam

**Job to be Done:**
"Preciso adaptar meu CV para padrões internacionais e mostrar que posso competir globalmente"

**Resultado Ideal:**
CV no formato esperado por recrutadores internacionais, com linguagem e estrutura adequadas

---

## User Stories

### Jornada de Descoberta

**US1:** Como visitante, quero entender o que a ferramenta faz em 5 segundos, para decidir se vale testar
- **Critério:** Hero section clara com proposta de valor + CTA visível

**US2:** Como visitante cético, quero ver provas de que funciona, para confiar na ferramenta
- **Critério:** Social proof (depoimentos, número de análises, before/after)

**US3:** Como visitante interessado, quero ver como funciona antes de testar, para reduzir fricção
- **Critério:** Seção "Como Funciona" com 3 passos visuais

---

### Jornada de Teste (Free)

**US4:** Como usuário free, quero fazer upload do meu CV rapidamente, para não perder tempo
- **Critério:** Drag & drop + aceita PDF/DOCX/TXT + feedback visual imediato
- **Edge Case:** Arquivo muito grande (>5MB) → mostrar erro claro
- **Edge Case:** Formato não suportado → sugerir conversão

**US5:** Como usuário free, quero que a análise seja rápida, para não desistir no meio
- **Critério:** Análise completa em <30 segundos + loading state claro
- **Edge Case:** API do Gemini falhar → retry automático 2x → mostrar erro amigável

**US6:** Como usuário free, quero entender meu score facilmente, para saber onde estou
- **Critério:** Score visual (0-100) + breakdown por dimensão + cores intuitivas (verde/amarelo/vermelho)

**US7:** Como usuário free, quero sugestões práticas, para saber exatamente o que melhorar
- **Critério:** Lista de ações concretas (não genéricas) por dimensão
- **Exemplo BOM:** "Adicione métricas de impacto na sua experiência na Empresa X (ex: 'Reduzi tempo de build em 40%')"
- **Exemplo RUIM:** "Melhore a descrição das suas experiências"

**US8:** Como usuário free impressionado, quero ver o que ganho no Pro, para considerar upgrade
- **Critério:** Paywall soft (não bloqueia análise) mostrando features Pro + CTA

---

### Jornada de Conversão (Free → Pro)

**US9:** Como usuário que quer mais análises, quero criar conta facilmente, para não perder tempo
- **Critério:** Signup com Google ou email + senha (Supabase Auth)
- **Edge Case:** Email já existe → login ou recuperação de senha

**US10:** Como usuário convertendo, quero pagar de forma segura e rápida, para não desistir
- **Critério:** Checkout Stripe com cartão + PIX (Brasil)
- **Critério:** Confirmação imediata de assinatura

**US11:** Como novo assinante Pro, quero acessar features imediatamente, para sentir valor
- **Critério:** Após pagamento → redirect para dashboard + badge "Pro" visível

---

### Jornada de Uso Recorrente (Pro)

**US12:** Como usuário Pro, quero fazer múltiplas análises sem limitações, para testar versões do CV
- **Critério:** Upload ilimitado + histórico das últimas 10 análises (futuro)

**US13:** Como usuário Pro, quero reescrever seções do meu CV com ajuda da IA, para economizar tempo
- **Critério:** Botão "Reescrever com IA" em cada seção do CV → gera 3 versões → usuário escolhe
- **Edge Case:** IA não conseguir gerar → mostrar mensagem + permitir retry

**US14:** Como usuário Pro satisfeito, quero gerenciar minha assinatura, para ter controle
- **Critério:** Página de settings com opção de cancelar/atualizar pagamento (Stripe portal)

---

## Requisitos Funcionais

### RF1: Sistema de Upload de Arquivos

**Descrição:** Permitir upload de CVs em múltiplos formatos

**Especificações:**
- Formatos aceitos: PDF, DOCX, TXT
- Tamanho máximo: 5MB
- Interface: Drag & drop + click to upload
- Validações:
  - Verificar formato antes de upload
  - Verificar tamanho antes de processar
  - Extrair texto do arquivo (usar libs: pdf-parse para PDF, mammoth para DOCX)

**Regras de Negócio:**
- Arquivo fica em Supabase Storage temporariamente (deletar após análise ou 24h)
- Associar arquivo ao user_id se autenticado
- Limitar a 1 upload simultâneo por usuário

**Critérios de Aceitação:**
- [ ] Usuário consegue fazer upload por drag & drop
- [ ] Usuário consegue fazer upload por click
- [ ] Feedback visual durante upload (progress bar)
- [ ] Erro claro se formato inválido
- [ ] Erro claro se arquivo muito grande

---

### RF2: Análise de CV por IA

**Descrição:** Processar CV e gerar análise estruturada em 5 dimensões

**Especificações:**

**Dimensões de Análise:**
1. **Formatação (0-20 pontos)**
   - Estrutura clara (seções bem definidas)
   - Espaçamento e legibilidade
   - Uso adequado de bullet points
   - Tamanho apropriado (1-2 páginas)

2. **Conteúdo (0-20 pontos)**
   - Clareza e objetividade
   - Ausência de erros gramaticais
   - Informações relevantes
   - Storytelling (progressão de carreira)

3. **Palavras-chave (0-20 pontos)**
   - Tecnologias relevantes mencionadas
   - Termos do mercado de tech
   - Otimização para ATS
   - Densidade adequada (não keyword stuffing)

4. **Experiência (0-20 pontos)**
   - Descrição de responsabilidades
   - Resultados mensuráveis
   - Evolução profissional visível
   - Projetos relevantes destacados

5. **Adequação ao Mercado (0-20 pontos)**
   - Alinhamento com expectativas do mercado tech
   - Soft skills mencionadas
   - Certificações e educação continuada
   - Presença online (GitHub, LinkedIn)

**Score Total:** 0-100 pontos (soma das 5 dimensões)

**Output da Análise:**
```typescript
{
  overallScore: number; // 0-100
  maxScore: 100;
  summary: string; // Resumo geral de 2-3 frases
  scores: [
    {
      dimension: string; // ex: "Formatação"
      icon: string; // emoji
      score: number; // 0-20
      maxScore: 20;
      feedback: string; // Análise específica dessa dimensão
      suggestions: string[]; // 2-4 sugestões práticas
    },
    // ... outras 4 dimensões
  ],
  strengths: string[]; // 3-5 pontos fortes do CV
  prioritySuggestions: string[]; // Top 3 melhorias de maior impacto
}
```

**Integração com Gemini:**
- Prompt estruturado solicitando análise nas 5 dimensões
- Prompt deve pedir output em JSON estruturado
- Timeout de 30 segundos
- Retry até 2x em caso de falha

**Regras de Negócio:**
- Usuário free: 1 análise gratuita (salvar em DB que já usou)
- Usuário Pro: ilimitado
- Análise deve ser salva no banco (user_id, file_name, result, created_at)

**Critérios de Aceitação:**
- [ ] Análise retorna score de 0-100
- [ ] Cada dimensão tem score individual + feedback
- [ ] Sugestões são práticas e específicas (não genéricas)
- [ ] Análise completa em <30 segundos
- [ ] Erro tratado se API falhar

---

### RF3: Sistema de Autenticação

**Descrição:** Permitir signup/login para controlar limite de análises

**Especificações:**
- Métodos de autenticação:
  - Email + Senha (Supabase Auth)
  - Google OAuth (Supabase Auth)
- Sessão persistente (cookie)
- Recuperação de senha por email

**Fluxo:**
1. Usuário free tenta fazer 2ª análise → prompt de login/signup
2. Após signup → email de confirmação (Supabase)
3. Após confirmação → pode usar plano free com limite

**Regras de Negócio:**
- Não bloquear primeira análise (sem login)
- Forçar login/signup a partir da 2ª análise
- Email deve ser único
- Senha: mínimo 8 caracteres

**Critérios de Aceitação:**
- [ ] Signup com email funciona
- [ ] Signup com Google funciona
- [ ] Login persiste sessão
- [ ] Logout funciona
- [ ] Recuperação de senha envia email

---

### RF4: Paywall e Planos

**Descrição:** Controlar acesso a features baseado no plano

**Especificações:**

**Plano Free:**
- 1 análise completa
- Sem reescrita assistida
- Sem histórico

**Plano Pro (R$ 39/mês):**
- Análises ilimitadas
- Reescrita assistida por IA
- Histórico (futuro)

**Implementação:**
- Campo `subscription_tier` na tabela `users` (free | pro)
- Campo `free_analyses_used` na tabela `users`
- Checar limite antes de processar análise
- Mostrar paywall quando limite atingido

**Critérios de Aceitação:**
- [ ] Usuário free é bloqueado após 1 análise
- [ ] Usuário Pro tem acesso ilimitado
- [ ] Badge "Pro" aparece para assinantes
- [ ] Paywall tem CTA claro para upgrade

---

### RF5: Pagamentos (Stripe)

**Descrição:** Processar assinaturas recorrentes

**Especificações:**
- Stripe Checkout para onboarding
- Webhook para confirmar pagamento
- Stripe Customer Portal para gestão

**Fluxo:**
1. Usuário clica "Upgrade to Pro"
2. Redirect para Stripe Checkout
3. Após pagamento → Stripe envia webhook
4. Webhook atualiza `subscription_tier` → `pro`
5. Redirect de volta para app

**Regras de Negócio:**
- Plano Pro: R$ 39/mês (recorrente)
- Aceitar cartão de crédito + PIX
- Cancelamento: acesso até fim do período pago

**Critérios de Aceitação:**
- [ ] Checkout funciona
- [ ] Webhook atualiza plano corretamente
- [ ] Usuário vê mudança imediata após pagamento
- [ ] Cancelamento funciona (via portal)

---

### RF6: Reescrita Assistida por IA (Feature Pro)

**Descrição:** Gerar versões melhoradas de seções do CV

**Especificações:**
- Disponível apenas para Pro
- Usuário seleciona seção do CV (Resumo, Experiência X, etc.)
- IA gera 3 versões reescritas
- Usuário escolhe qual prefere (ou descarta todas)

**Prompt para IA:**
"Reescreva a seguinte seção de CV de forma mais impactante, destacando resultados mensuráveis e usando verbos de ação. Gere 3 versões com estilos diferentes: [1] Concisa, [2] Detalhada, [3] Focada em Resultados"

**Critérios de Aceitação:**
- [ ] Botão "Reescrever com IA" aparece apenas para Pro
- [ ] Gera 3 versões diferentes
- [ ] Usuário pode copiar versão escolhida
- [ ] Erro tratado se IA falhar

---

## Requisitos Não-Funcionais

### RNF1: Performance
- Análise completa deve levar <30 segundos
- Landing page deve carregar em <2 segundos (LCP)
- Upload de arquivo deve ter progress bar se >1 segundo

### RNF2: Segurança
- CVs contêm dados sensíveis → criptografia em trânsito (HTTPS)
- Arquivos temporários deletados após análise
- Apenas owner pode ver suas análises
- Políticas de RLS (Row Level Security) no Supabase

### RNF3: Escalabilidade
- Suportar 100 análises simultâneas sem degradação
- Rate limiting na API (10 req/min por IP)

### RNF4: Usabilidade
- Interface responsiva (mobile-first)
- Acessibilidade: contraste WCAG AA, navegação por teclado
- Mensagens de erro claras e acionáveis

### RNF5: Observabilidade
- Logs de erros (Sentry ou similar)
- Analytics de conversão (Plausible ou GA4)
- Monitoramento de uptime da API do Gemini

---

## Integrações

### Supabase
- **Auth:** Signup, login, OAuth
- **Database (PostgreSQL):**
  - Tabela `users` (id, email, subscription_tier, free_analyses_used)
  - Tabela `analyses` (id, user_id, file_name, result_json, created_at)
- **Storage:** Upload temporário de CVs

### Google Gemini API
- Modelo: `gemini-1.5-flash` ou `gemini-1.5-pro`
- Endpoint de análise de texto
- Handling de rate limits e errors

### Stripe
- Checkout para assinatura
- Webhooks para confirmação de pagamento
- Customer Portal para gestão de assinatura

---

## Casos de Borda e Edge Cases

### Upload de Arquivo
- **Arquivo corrompido:** Mostrar erro "Não foi possível processar este arquivo. Tente outro formato."
- **Arquivo sem texto:** Mostrar erro "CV parece estar vazio ou é uma imagem. Use um arquivo com texto."
- **Arquivo muito longo (>10 páginas):** Warning "Seu CV tem X páginas. Recomendamos 1-2 páginas para melhor resultado."

### Análise
- **API do Gemini fora do ar:** Retry 2x → erro "Nosso sistema de análise está temporariamente indisponível. Tente novamente em alguns minutos."
- **Resposta da IA malformada:** Fallback para mensagem genérica + log do erro para debug
- **Texto do CV muito curto (<100 palavras):** Warning "Seu CV parece muito curto. Análise pode não ser precisa."

### Autenticação
- **Email já cadastrado:** Sugerir login ou recuperação de senha
- **Confirmação de email não feita:** Bloquear login + botão "Reenviar email de confirmação"
- **Sessão expirada:** Redirect para login com mensagem clara

### Pagamento
- **Pagamento falha:** Mostrar erro do Stripe + sugerir retry
- **Webhook não chega:** Implementar fallback para checar status após 5 minutos
- **Usuário cancela no meio do checkout:** Permitir retry sem duplicar

---

## Critérios de Sucesso do MVP

### Técnicos:
- [ ] 95% das análises completam com sucesso
- [ ] <5% de erros em uploads
- [ ] Tempo médio de análise <25 segundos
- [ ] Zero vazamento de dados

### Produto:
- [ ] Taxa de conclusão de análise >80%
- [ ] Conversão free→Pro de 5-10%
- [ ] NPS >50 nos primeiros 100 usuários

### Negócio:
- [ ] 1000 usuários nos primeiros 3 meses
- [ ] 50-100 assinantes Pro (R$ 2-4k MRR)

---

**Próximo passo:** Implementação seguindo este PRD + MVP Scope + Design Guidelines
