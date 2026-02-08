import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
});

// Preços dos planos (IDs do Stripe)
export const STRIPE_PLANS = {
  PRO_MONTHLY: process.env.STRIPE_PRICE_ID_PRO_MONTHLY || '', // Será criado no Stripe Dashboard
};

// Helper para criar/obter customer no Stripe
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string
): Promise<string> {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = await createClient();

  // Verificar se já existe customer_id
  const { data: userData } = await supabase
    .from('users')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (userData?.stripe_customer_id) {
    return userData.stripe_customer_id;
  }

  // Criar novo customer no Stripe
  const customer = await stripe.customers.create({
    email,
    metadata: {
      supabase_user_id: userId,
    },
  });

  // Salvar customer_id no banco
  await supabase
    .from('users')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId);

  return customer.id;
}

// Helper para verificar se assinatura está ativa
export function isSubscriptionActive(status: string): boolean {
  return ['active', 'trialing'].includes(status);
}
