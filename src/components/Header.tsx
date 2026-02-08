'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useStripe } from '@/hooks/useStripe';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const { openCustomerPortal, loading: stripeLoading } = useStripe();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isPro, setIsPro] = useState(false);

  // Verificar se usuário é Pro
  useEffect(() => {
    const checkProStatus = async () => {
      if (!user) {
        setIsPro(false);
        return;
      }

      const supabase = createClient();
      const { data } = await supabase
        .from('users')
        .select('subscription_tier')
        .eq('id', user.id)
        .single();

      setIsPro(data?.subscription_tier === 'pro');
    };

    checkProStatus();
  }, [user]);

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
    } catch (error) {
      console.error('Error opening portal:', error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between mb-12 md:mb-20">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white font-bold text-xl">CV</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">CV Analyzer</span>
        </div>

        {!loading && (
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  {isPro && (
                    <Badge variant="default" className="cursor-pointer" onClick={handleManageSubscription}>
                      Pro
                    </Badge>
                  )}
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
                {isPro && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleManageSubscription}
                    disabled={stripeLoading}
                    className="hidden md:flex"
                  >
                    Gerenciar
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAuthModal(true)}
              >
                Entrar
              </Button>
            )}
          </div>
        )}
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
