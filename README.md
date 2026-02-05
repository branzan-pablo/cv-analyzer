# CV Analyzer

Ferramenta de análise de currículos com IA, similar ao CV10x. Analise seu currículo e receba sugestões práticas para aumentar suas chances em processos seletivos.

## ✨ Funcionalidades

- 📄 **Upload de CV**: Suporte a PDF, DOCX e TXT
- 🤖 **Análise com IA**: Powered by Google Gemini 1.5 Flash
- 📊 **5 Dimensões de Avaliação**: Formatação, Conteúdo, Palavras-chave, Experiência e Adequação
- 🎯 **Comparação com Vaga**: Análise direcionada aos requisitos da posição
- 🔒 **Limite de Uso**: 1 análise gratuita por usuário (fingerprint + IP)

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 16 + React 19 + Tailwind CSS 4
- **Backend**: Next.js API Routes
- **IA**: Google Gemini 1.5 Flash
- **Database**: Supabase (PostgreSQL)
- **Deploy**: Vercel

## 🚀 Começando

### Pré-requisitos

- Node.js >= 20.9.0
- Conta no [Supabase](https://supabase.com)
- [API Key do Google Gemini](https://aistudio.google.com/app/apikey)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/PabloFBDev/cv-analyzer.git
cd cv-analyzer
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_publishable_key
GEMINI_API_KEY=sua_gemini_api_key
```

4. Configure o Supabase:
   - Acesse o SQL Editor do seu projeto
   - Execute o SQL em `supabase_setup.sql`

5. Rode o projeto:
```bash
npm run dev
```

6. Acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Layout com metadata
│   └── api/analyze/route.ts  # API de análise
├── components/
│   ├── FileUpload.tsx        # Upload drag & drop
│   ├── ScoreCard.tsx         # Card de pontuação
│   └── AnalysisResult.tsx    # Resultado
├── lib/
│   ├── ai.ts                 # Integração Gemini
│   ├── extractText.ts        # Extração PDF/DOCX
│   └── supabase/             # Clientes Supabase
└── types/index.ts            # Tipos TypeScript
```

## 🌐 Deploy

### Vercel

1. Conecte seu repositório GitHub no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático!

## 📝 Licença

MIT
