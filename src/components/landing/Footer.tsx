export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CV</span>
              </div>
              <span className="text-xl font-bold text-white">CV Analyzer</span>
            </div>
            <p className="text-sm text-gray-500">
              Analise seu currículo com IA e aumente suas chances nos processos seletivos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="mailto:contato@cvanalyzer.com" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} CV Analyzer. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
