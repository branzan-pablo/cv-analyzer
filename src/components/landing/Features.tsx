export default function Features() {
  const features = [
    {
      emoji: "📝",
      title: "Formatação",
      description: "Avaliação de estrutura, legibilidade e organização visual do seu CV.",
      points: [
        "Estrutura clara e seções bem definidas",
        "Espaçamento e hierarquia visual",
        "Tamanho apropriado (1-2 páginas)"
      ]
    },
    {
      emoji: "✍️",
      title: "Conteúdo",
      description: "Análise da qualidade da escrita e storytelling profissional.",
      points: [
        "Clareza e objetividade",
        "Gramática e ortografia",
        "Progressão de carreira visível"
      ]
    },
    {
      emoji: "🔑",
      title: "Palavras-chave",
      description: "Otimização para sistemas ATS e recrutadores.",
      points: [
        "Tecnologias relevantes mencionadas",
        "Termos do mercado de tech",
        "Densidade adequada de keywords"
      ]
    },
    {
      emoji: "💼",
      title: "Experiência",
      description: "Avaliação de como você apresenta suas conquistas.",
      points: [
        "Descrição de responsabilidades",
        "Resultados mensuráveis",
        "Projetos relevantes destacados"
      ]
    },
    {
      emoji: "🎯",
      title: "Adequação ao Mercado",
      description: "Alinhamento com expectativas do mercado tech atual.",
      points: [
        "Soft skills mencionadas",
        "Certificações e educação continuada",
        "Presença online (GitHub, LinkedIn)"
      ]
    }
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">5 Dimensões de Análise</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Análise completa e detalhada
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada aspecto do seu currículo é avaliado com precisão pela nossa IA
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-100 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-4">
                <span className="text-3xl">{feature.emoji}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mt-2 flex-shrink-0"></div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
