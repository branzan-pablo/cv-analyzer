export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Envie seu CV",
      description: "Faça upload do seu currículo em PDF, DOCX ou TXT. Rápido e seguro."
    },
    {
      number: 2,
      title: "IA Analisa em 5 Dimensões",
      description: "Nossa inteligência artificial avalia formatação, conteúdo, palavras-chave, experiência e adequação ao mercado."
    },
    {
      number: 3,
      title: "Receba Sugestões Práticas",
      description: "Obtenha feedback detalhado e ações específicas para melhorar seu currículo."
    }
  ];

  return (
    <section className="w-full py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Como Funciona</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simples, rápido e eficiente
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Em apenas 3 passos, você transforma seu currículo e aumenta suas chances de sucesso
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              
              {/* Arrow connector (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-6 text-gray-300 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
