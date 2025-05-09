'use server';

import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export async function creditCardPayment() {
  let session: Stripe.Response<Stripe.Checkout.Session> | null = null;
  try {
    // Define a dynamic product
    const product = {
      name: 'Dynamic Product',
      price: 3000, // $30.00 in cents
      currency: 'aud',
      quantity: 1,
    };

    // Create a Stripe Checkout session
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              images: [
                'https://aienergyshop.com.au/cdn/shop/files/SOLPLANET-ASW-3-6K-S-G2-front-e1660737576595.png?v=1726620148',
                'https://aienergyshop.com.au/cdn/shop/files/SOLPLANET-ASW-3-6K-S-G2-front-e1660737576595.png?v=1726620148',
              ],
            },
            unit_amount: product.price,
          },
          quantity: product.quantity,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,

      // Optional: Manual confirmation
      payment_intent_data: {
        description:
          "For Bank Transfer: Send payment to BSB 123-456, Account No: 987654321 with 'ORD12345' as reference. Send remittance to someemail@email.com.",
      },
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
  }

  if (session !== null) {
    // console.log({ session });
    redirect(session.url as string);
  }
}
