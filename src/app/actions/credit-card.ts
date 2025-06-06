'use server';

import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import CREDIT_CARD_OPERATION from '@/graphql/creditCard';
import { Auser } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { deletePaymentMethodDetails, getPaymentMethodDetails } from './stripe';

const client = getClient();

export async function createNewCreditCard(paymentMethodId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;
  const aUser: Auser = JSON.parse(cookieStore.get('a-user')?.value!);

  const { result } = await getPaymentMethodDetails(paymentMethodId);

  try {
    await client.mutate({
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
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/cart');
}

export async function updateCreditCardDefault(
  documentId: string,
  isDefault: boolean
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;

  try {
    await client.mutate({
      mutation: CREDIT_CARD_OPERATION.Mutation.updateCreditCardDefault,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: { documentId: documentId, data: { isDefault } },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/cart');
}

export async function deleteCreditCard(
  documentId: string,
  stripePaymentMethodID: string
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;

  try {
    const result = await client.mutate({
      mutation: CREDIT_CARD_OPERATION.Mutation.deleteCreditCard,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: { documentId },
    });

    if (result.data?.deleteCreditCard?.documentId) {
      await deletePaymentMethodDetails(stripePaymentMethodID);
    }
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/cart');
}
