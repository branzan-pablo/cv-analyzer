import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalysisResult } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const ANALYSIS_PROMPT = `Você é um especialista em recrutamento e análise de currículos. Analise o currículo fornecido e retorne uma avaliação detalhada em formato JSON.

IMPORTANTE: Retorne APENAS o JSON, sem markdown, sem código, sem explicações extras.

Analise o currículo nas seguintes 5 dimensões (pontuação de 0 a 20 cada, totalizando 100 pontos):

1. **Formatação e Legibilidade** (0-20): Avalie a estrutura, organização, clareza visual e compatibilidade com sistemas ATS.

2. **Conteúdo e Clareza** (0-20): Avalie a qualidade das descrições, uso de verbos de ação, e capacidade de comunicar valor.

3. **Palavras-chave e Skills** (0-20): Avalie a presença de termos técnicos relevantes, habilidades e competências.

4. **Experiência e Conquistas** (0-20): Avalie como as experiências são descritas, métricas de impacto e resultados quantificáveis.

5. **Adequação Geral** (0-20): Avalie a coerência geral, progressão de carreira e profissionalismo.

{JOB_DESCRIPTION_INSTRUCTION}

Retorne EXATAMENTE neste formato JSON:
{
  "overallScore": <número>,
  "maxScore": 100,
  "scores": [
    {
      "dimension": "Formatação e Legibilidade",
      "score": <número>,
      "maxScore": 20,
      "feedback": "<feedback específico>",
      "suggestions": ["<sugestão 1>", "<sugestão 2>"],
      "icon": "📄"
    },
    {
      "dimension": "Conteúdo e Clareza",
      "score": <número>,
      "maxScore": 20,
      "feedback": "<feedback específico>",
      "suggestions": ["<sugestão 1>", "<sugestão 2>"],
      "icon": "✍️"
    },
    {
      "dimension": "Palavras-chave e Skills",
      "score": <número>,
      "maxScore": 20,
      "feedback": "<feedback específico>",
      "suggestions": ["<sugestão 1>", "<sugestão 2>"],
      "icon": "🔑"
    },
    {
      "dimension": "Experiência e Conquistas",
      "score": <número>,
      "maxScore": 20,
      "feedback": "<feedback específico>",
      "suggestions": ["<sugestão 1>", "<sugestão 2>"],
      "icon": "🏆"
    },
    {
      "dimension": "Adequação Geral",
      "score": <número>,
      "maxScore": 20,
      "feedback": "<feedback específico>",
      "suggestions": ["<sugestão 1>", "<sugestão 2>"],
      "icon": "✅"
    }
  ],
  "summary": "<resumo geral da análise em 2-3 frases>",
  "prioritySuggestions": ["<top 3 melhorias prioritárias>"],
  "strengths": ["<2-3 pontos fortes do currículo>"]
}`;

export async function analyzeCV(
  cvText: string,
  jobDescription?: string
): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }, { apiVersion: 'v1' });

  let prompt = ANALYSIS_PROMPT;

  if (jobDescription && jobDescription.trim()) {
    prompt = prompt.replace(
      '{JOB_DESCRIPTION_INSTRUCTION}',
      `ATENÇÃO: Compare o currículo com a seguinte descrição de vaga e ajuste a pontuação da dimensão "Adequação Geral" baseado na compatibilidade:\n\nDESCRIÇÃO DA VAGA:\n${jobDescription}`
    );
  } else {
    prompt = prompt.replace('{JOB_DESCRIPTION_INSTRUCTION}', '');
  }

  const fullPrompt = `${prompt}\n\nCURRÍCULO:\n${cvText}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const analysisResult: AnalysisResult = JSON.parse(cleanedText);
    return analysisResult;
  } catch (error) {
    console.error('Error analyzing CV:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Falha na análise de IA: ${errorMessage}`);
  }
}
