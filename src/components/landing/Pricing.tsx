'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useStripe } from '@/hooks/useStripe';
import { useState } from 'react';
import AuthModal from '@/components/auth/AuthModal';

export default function Pricing() {
  const { user } = useAuth();
  const { createCheckoutSession, loading } = useStripe();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    try {
      await createCheckoutSession();
    } catch (error) {
      console.error('Error upgrading:', error);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <section className="w-full py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Planos</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha o melhor para você
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comece grátis e faça upgrade quando precisar de mais
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-100 rounded-3xl p-8 border-2 border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">Grátis</Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-gray-900">R$ 0</span>
              </div>
              <p className="text-gray-600">Perfeito para testar a ferramenta</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700">1 análise completa</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Análise nas 5 dimensões</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700">Sugestões detalhadas</span>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <span className="text-gray-400 font-bold mt-0.5">✗</span>
                <span className="text-gray-500">Análises ilimitadas</span>
              </li>
              <li className="flex items-start gap-3 opacity-50">
                <span className="text-gray-400 font-bold mt-0.5">✗</span>
                <span className="text-gray-500">Reescrita assistida por IA</span>
              </li>
            </ul>

            <Button 
              variant="outline" 
              className="w-full" 
              size="lg"
              onClick={handleScrollToTop}
            >
              Começar Grátis
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-purple-500 shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge variant="default" className="shadow-lg">Mais Popular</Badge>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">R$ 39</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600">Para quem leva a carreira a sério</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700 font-medium">Análises ilimitadas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700 font-medium">Reescrita assistida por IA</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700 font-medium">Sugestões avançadas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700 font-medium">Histórico de análises</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700 font-medium">Prioridade no suporte</span>
              </li>
            </ul>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleUpgrade}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Carregando...
                </div>
              ) : (
                'Assinar Pro'
              )}
            </Button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          handleUpgrade();
        }}
      />
    </section>
  );
}
