# CV Analyzer - Brief Executivo

## Problema

Profissionais de tecnologia perdem oportunidades de emprego porque seus currículos são mal estruturados, carecem de palavras-chave relevantes, têm formatação confusa e falham em destacar suas experiências de forma atrativa para recrutadores e sistemas ATS (Applicant Tracking System).

**Impacto:** CVs ruins = menos entrevistas = oportunidades perdidas = frustração profissional

## Solução

CV Analyzer é uma ferramenta de análise de currículos potencializada por IA (Google Gemini) que avalia CVs de profissionais de tecnologia em 5 dimensões críticas e fornece feedback acionável e específico para melhorar as chances em processos seletivos.

### Como Funciona:
1. Usuário faz upload do CV (PDF, DOCX ou TXT)
2. IA analisa em 5 dimensões: Formatação, Conteúdo, Palavras-chave, Experiência, Adequação ao mercado
3. Recebe score detalhado + sugestões práticas de melhoria
4. Pode usar reescrita assistida por IA (plano Pro)

## Público-Alvo

**Primário:** Desenvolvedores e profissionais de tecnologia em todos os níveis (júnior, pleno, sênior) que buscam:
- Primeiro emprego na área
- Transição de carreira
- Upgrade para posições melhores
- Vagas em empresas competitivas

**Secundário (futuro):** Profissionais de outras áreas após validação do MVP

## Diferencial Competitivo

Concorrentes existem mas são **superficiais, confusos e com UX ruim**.

**Nossos Diferenciais:**
1. **UX Superior:** Interface clean, moderna, resultados claros e fáceis de entender
2. **Análise Profunda:** 5 dimensões específicas com scoring detalhado
3. **Feedback Acionável:** Não só aponta problemas, mas dá sugestões práticas
4. **Feature Killer (Pro):** Reescrita assistida por IA de seções do CV
5. **Foco em Tech:** Análise adaptada às necessidades do mercado de tecnologia

## Modelo de Negócio

**Freemium:**

### Plano Free
- 1 análise completa gratuita
- Acesso a todas as 5 dimensões de avaliação
- Sugestões de melhoria detalhadas
- Objetivo: Provar valor e converter para Pro

### Plano Pro (Pago - Recorrente)
- Análises ilimitadas
- Reescrita assistida por IA (feature killer)
- Histórico de análises (futuro)
- Comparação com descrições de vagas (futuro)
- Preço: A definir (sugestão: R$ 29-49/mês)

**Monetização:** Stripe para pagamentos recorrentes

## Métricas de Sucesso

### Curto Prazo (3 meses):
- **Aquisição:** 1000 usuários testando a versão free
- **Conversão:** 5-10% de free → Pro
- **Qualidade:** NPS > 50
- **Produto:** Taxa de conclusão de análise > 80%

### Médio Prazo (6 meses):
- **Receita:** MRR de R$ 10k
- **Retenção:** Churn < 10%/mês
- **Produto:** 90% dos usuários consideram análise útil/muito útil

### Indicadores Qualitativos:
- Feedback positivo sobre clareza da análise
- Usuários reportando melhoria em callbacks de vagas
- Recomendação orgânica (viral loop)

## Stack Técnico

- **Frontend:** Next.js 14+ (App Router)
- **Backend:** Next.js API Routes (mínimo server-side)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (arquivos de CV)
- **IA:** Google Gemini API
- **Pagamentos:** Stripe
- **UI:** shadcn/ui + Tailwind CSS
- **Deploy:** Vercel

## Timeline Sugerido

- **Semana 1-2:** Landing page + Design system
- **Semana 3-4:** Sistema de upload + Integração Gemini API
- **Semana 5-6:** Dashboard de análise + Scoring
- **Semana 7-8:** Auth + Paywall + Stripe
- **Semana 9:** Testes + Ajustes
- **Semana 10:** Launch MVP

## Próximos Passos

1. Validar documentação completa (PRD, Scope, Design)
2. Implementar MVP seguindo specs
3. Beta testing com 20-50 usuários
4. Iterar baseado em feedback
5. Launch público
6. Growth e iteração contínua
