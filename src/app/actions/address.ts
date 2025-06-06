'use server';

import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import ADDRESS_OPERATION from '@/graphql/address';
import { Auser } from '@/lib/types';
import { addressSchema } from '@/lib/validation-schema/address-form';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

type AddressSchemaTypes = z.infer<typeof addressSchema>;

const client = getClient();

export async function getAddress() {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;
  const aUser: Auser = JSON.parse(cookieStore.get('a-user')?.value!);

  const res = await client.query({
    query: ADDRESS_OPERATION.Query.address,
    variables: {
      documentId: aUser.documentId,
    },
    fetchPolicy: 'network-only',
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return res;
}

export async function addNewAddress(value: AddressSchemaTypes) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;
  const aUser: Auser = JSON.parse(cookieStore.get('a-user')?.value!);

  const res = await client.mutate({
    mutation: ADDRESS_OPERATION.Mutation.addAdress,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: {
      data: { ...value, users: [aUser.documentId] },
    },
  });

  if (res.data?.createAddress?.documentId) {
    revalidatePath('/address');
  }

  return res;
}

export async function deleteAddress(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;

  const res = await client.mutate({
    mutation: ADDRESS_OPERATION.Mutation.deleteAddress,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: {
      documentId: id,
    },
  });

  if (res.data?.deleteAddress?.documentId) {
    revalidatePath('/address');
  }

  return res;
}

export async function updateAddress(
  documentId: string,
  value: AddressSchemaTypes
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;

  const res = await client.mutate({
    mutation: ADDRESS_OPERATION.Mutation.updateAddress,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: {
      documentId,
      data: { ...value },
    },
  });

  if (res.data?.updateAddress?.documentId) {
    revalidatePath('/address');
  }

  return res;
}

export async function updateAddressIsActiveToFalse(documentId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;

  await client.mutate({
    mutation: ADDRESS_OPERATION.Mutation.makeAddressNotDefault,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: {
      documentId,
      data: { isActive: false },
    },
  });
}
