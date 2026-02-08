'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Como funciona a análise por IA?",
      answer: "Utilizamos o Google Gemini, um dos modelos de IA mais avançados, para analisar seu currículo em 5 dimensões críticas: formatação, conteúdo, palavras-chave, experiência e adequação ao mercado. A IA foi treinada especificamente para entender o contexto do mercado tech brasileiro."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim! Seus dados são criptografados e armazenados de forma segura. Não compartilhamos suas informações com terceiros. Os arquivos de CV são processados e depois removidos dos nossos servidores. Levamos privacidade e segurança muito a sério."
    },
    {
      question: "Posso cancelar o plano Pro a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta. Não há multas ou taxas de cancelamento. Você continuará tendo acesso aos benefícios Pro até o final do período já pago."
    },
    {
      question: "Qual a diferença para outros analisadores de CV?",
      answer: "Nosso diferencial está na qualidade da análise e na experiência do usuário. Enquanto outras ferramentas dão feedback genérico, nós fornecemos sugestões específicas e acionáveis. Além disso, nossa interface é moderna, clara e fácil de usar."
    },
    {
      question: "Funciona para qualquer área ou só tech?",
      answer: "No momento, nossa análise é otimizada para profissionais de tecnologia (desenvolvedores, designers, product managers, etc.). Estamos trabalhando para expandir para outras áreas em breve."
    },
    {
      question: "Quanto tempo leva a análise?",
      answer: "A análise completa do seu currículo leva em média 20-30 segundos. Durante esse tempo, nossa IA está avaliando cada aspecto do seu CV e gerando sugestões personalizadas."
    }
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Tire suas dúvidas sobre o CV Analyzer
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-purple-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-8">{faq.question}</h3>
                <span className={`text-2xl text-gray-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
