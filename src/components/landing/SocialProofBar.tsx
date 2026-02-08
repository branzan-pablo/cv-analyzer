export default function SocialProofBar() {
  return (
    <section className="w-full bg-gradient-to-r from-gray-100 to-gray-200/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              1000+
            </p>
            <p className="text-sm text-gray-600 font-medium">Currículos analisados</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              95%
            </p>
            <p className="text-sm text-gray-600 font-medium">De aprovação dos usuários</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              &lt; 30s
            </p>
            <p className="text-sm text-gray-600 font-medium">Tempo médio de análise</p>
          </div>
        </div>
      </div>
    </section>
  );
}
