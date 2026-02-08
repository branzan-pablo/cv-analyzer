import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe, getOrCreateStripeCustomer, STRIPE_PLANS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para fazer upgrade.' },
        { status: 401 }
      );
    }

    // Obter ou criar customer no Stripe
    const customerId = await getOrCreateStripeCustomer(user.id, user.email!);

    // Criar Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_PLANS.PRO_MONTHLY,
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/?success=true`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
      metadata: {
        user_id: user.id,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const message = error instanceof Error ? error.message : 'Erro ao criar sessão de pagamento.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
