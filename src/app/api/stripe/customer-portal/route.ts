import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Você precisa estar logado.' },
        { status: 401 }
      );
    }

    // Buscar customer_id do banco
    const { data: userData } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!userData?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'Você não possui uma assinatura.' },
        { status: 404 }
      );
    }

    // Criar sessão do Customer Portal
    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripe_customer_id,
      return_url: `${request.headers.get('origin')}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    const message = error instanceof Error ? error.message : 'Erro ao acessar portal de assinatura.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
