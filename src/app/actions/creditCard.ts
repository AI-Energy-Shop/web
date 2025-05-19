'use server';

import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import CREDIT_CARD_OPERATION from '@/graphql/creditCard';
import { Auser } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';
import { getPaymentMethodDetails } from './stripe';

const client = getClient();

export async function createNewCreditCard(paymentMethodId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token')?.value;
  const aUser: Auser = JSON.parse(cookieStore.get('a-user')?.value!);

  const { result } = await getPaymentMethodDetails(paymentMethodId);

  const res = await client.mutate({
    mutation: CREDIT_CARD_OPERATION.Mutation.createCreditCard,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: {
      data: {
        brand: result?.card?.brand,
        expMonth: result?.card?.exp_month.toString() || '',
        expYear: result?.card?.exp_year.toString() || '',
        last4Char: result?.card?.last4,
        stripePaymentMethodID: result?.id,
        user: aUser.documentId,
      },
    },
  });

  if (res.data?.createCreditCard?.documentId) {
    revalidatePath('/cart');
  }
}
