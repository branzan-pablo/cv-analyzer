'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStripe } from '@/hooks/useStripe';

interface PaywallProps {
  isOpen: boolean;
  onClose: () => void;
  requiresAuth?: boolean;
  onShowAuth?: () => void;
}

export default function Paywall({ isOpen, onClose, requiresAuth, onShowAuth }: PaywallProps) {
  const { createCheckoutSession, loading } = useStripe();

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    try {
      await createCheckoutSession();
    } catch (error) {
      console.error('Error upgrading:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-3xl max-w-2xl w-full p-8 md:p-12 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30">
            <span className="text-4xl">🚀</span>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {requiresAuth ? 'Limite de análise atingido' : 'Desbloqueie análises ilimitadas'}
            </h2>
            <p className="text-lg text-gray-600">
              {requiresAuth 
                ? 'Você já usou sua análise gratuita. Crie uma conta para continuar!'
                : 'Você já usou sua análise gratuita. Faça upgrade para Pro!'}
            </p>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
            <Badge variant="default" className="mb-4">
              Plano Pro
            </Badge>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Análises ilimitadas</p>
                  <p className="text-sm text-gray-600">Teste quantas versões quiser</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Reescrita assistida por IA</p>
                  <p className="text-sm text-gray-600">IA reescreve seções do seu CV</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Histórico de análises</p>
                  <p className="text-sm text-gray-600">Acesse análises anteriores</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">Suporte prioritário</p>
                  <p className="text-sm text-gray-600">Atendimento preferencial</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  R$ 39
                </span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-sm text-gray-500">Cancele quando quiser</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {requiresAuth ? (
              <>
                <Button
                  onClick={onShowAuth}
                  size="lg"
                  className="w-full"
                >
                  Criar Conta Grátis
                </Button>
                <p className="text-sm text-gray-500">
                  Já tem conta?{' '}
                  <button
                    onClick={onShowAuth}
                    className="text-purple-600 font-semibold hover:text-purple-700"
                  >
                    Fazer login
                  </button>
                </p>
              </>
            ) : (
              <>
                <Button
                  onClick={handleUpgrade}
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Carregando...
                    </div>
                  ) : (
                    'Fazer Upgrade para Pro'
                  )}
                </Button>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  Não, obrigado
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
