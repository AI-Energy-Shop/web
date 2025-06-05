'use server';

import { stripe } from '@/lib/stripe';

export const createSetupIntent = async () => {
  // TODO ROI - make the customerId a parameter
  const customerId = 'cus_SKwjnSwMZCvrxN';

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

export const getPaymentMethodDetails = async (paymentMethodId: string) => {
  try {
    const result = await stripe.paymentMethods.retrieve(paymentMethodId);

    const data = {
      brand: result?.card?.brand,
      expMonth: result?.card?.exp_month.toString(),
      expYear: result?.card?.exp_year.toString(),
      last4Char: result?.card?.last4,
      stripePaymentMethodID: result?.id,
    };

    return { result: data, error: null };
  } catch (err) {
    return { result: null, error: err };
  }
};

export const deletePaymentMethodDetails = async (paymentMethodId: string) => {
  try {
    const result = await stripe.paymentMethods.detach(paymentMethodId);
    return { result, error: null };
  } catch (err) {
    return { result: null, error: err };
  }
};
