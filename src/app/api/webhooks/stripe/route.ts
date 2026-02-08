import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.user_id;

        if (!userId) {
          console.error('No user_id in subscription metadata');
          break;
        }

        const status = subscription.status;
        const isActive = ['active', 'trialing'].includes(status);

        await supabase
          .from('users')
          .update({
            subscription_tier: isActive ? 'pro' : 'free',
            stripe_subscription_id: subscription.id,
            subscription_status: status,
          })
          .eq('id', userId);

        console.log(`Subscription ${subscription.id} updated for user ${userId}: ${status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.user_id;

        if (!userId) {
          console.error('No user_id in subscription metadata');
          break;
        }

        await supabase
          .from('users')
          .update({
            subscription_tier: 'free',
            subscription_status: 'canceled',
          })
          .eq('id', userId);

        console.log(`Subscription ${subscription.id} canceled for user ${userId}`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Payment succeeded for invoice ${invoice.id}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any; // Use any para acessar subscription
        
        // Verificar se existe subscription_id
        if (invoice.subscription && typeof invoice.subscription === 'string') {
          const sub = await stripe.subscriptions.retrieve(invoice.subscription);
          const userId = sub.metadata.user_id;

          if (userId) {
            await supabase
              .from('users')
              .update({
                subscription_status: 'past_due',
              })
              .eq('id', userId);

            console.log(`Payment failed for user ${userId}`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
