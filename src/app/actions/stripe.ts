'use server';

import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export const createSetupIntent = async () => {
  const customerId = 'cus_SGolDvetNVQ9iz';

  let clientSecret: string | null;
  let error: boolean = false;

  try {
    const response = await stripe.setupIntents.create({
      customer: customerId,
      usage: 'off_session',
    });

    clientSecret = response.client_secret;
    error = false;
  } catch (error) {
    clientSecret = null;
    error = true;
  }

  return { clientSecret, error };
};
