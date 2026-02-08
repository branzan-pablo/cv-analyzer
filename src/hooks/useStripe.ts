'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function useStripe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async () => {
    setLoading(true);
    setError(null);

    try {
      // Criar sessão de checkout
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar sessão de pagamento');
      }

      // Redirecionar para Stripe Checkout usando URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout não foi retornada');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      setLoading(false);
      throw err;
    }
  };

  const openCustomerPortal = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao acessar portal');
      }

      // Redirecionar para Customer Portal
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      setLoading(false);
      throw err;
    }
  };

  return {
    createCheckoutSession,
    openCustomerPortal,
    loading,
    error,
  };
}
