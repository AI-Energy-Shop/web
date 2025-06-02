'use server';
import USERS_OPERATIONS from '@/graphql/users';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import { redirect } from 'next/navigation';
import {
  Enum_Userspermissionsuser_Account_Status,
  InputMaybe,
} from '@/lib/gql/graphql';
import { revalidatePath } from 'next/cache';
import { handleGraphQLError } from '@/lib/utils/graphql-error';
import { ApolloError } from '@apollo/client';

const client = getClient();

export const registerUser = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const businessType = formData.get('businessType') as string;
  const businessNumber = formData.get('businessNumber') as string;
  const businessName = formData.get('businessName') as string;
  const street1 = formData.get('street1') as string;
  const street2 = formData.get('street2') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const zipCode = formData.get('zipCode') as string;
  const country = formData.get('country') as string;
  const phone = formData.get('phone') as string;

  try {
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.registerUser,
      variables: {
        data: {
          email,
          username,
          password,
          businessName,
          businessNumber,
          businessType,
          phone,
          street1,
          street2,
          state,
          city,
          country,
          zipCode,
        },
      },
    });

    if (response.errors) {
      return { error: response.errors[0].message };
    }

    return {
      data: response.data,
    };
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
};

export const loginUser = async ({
  email,
  password,
  remember,
}: {
  email: string;
  password: string;
  remember?: boolean;
}): Promise<{
  error?: {
    message: string;
    type: string;
  };
  data?: {
    token?: string | null;
    user?: any | null;
  };
}> => {
  try {
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.login,
      variables: {
        input: {
          identifier: email,
          password: password,
          provider: 'local',
        },
      },
    });

    if (!response.data) {
      return {
        error: {
          message: 'No user data',
          type: 'error',
        },
      };
    }

    const token = response?.data.login.jwt;
    const user = response?.data.login.user;
    const cookieStore = await cookies();

    const userRes = await client.query({
      query: USERS_OPERATIONS.Queries.usersPermissionsUser,
      variables: {
        documentId: user.documentId,
      },
      fetchPolicy: 'network-only',
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const userRawData = userRes?.data?.usersPermissionsUser;
    const userDetails = userRawData?.account_detail;

    const name = {
      first_name: userDetails?.name?.first_name,
      middle_name: userDetails?.name?.middle_name,
      last_name: userDetails?.name?.last_name,
    };

    const warehouseLocation = {
      id: userDetails?.warehouseLocation?.id,
      name: userDetails?.warehouseLocation?.name,
      title: userDetails?.warehouseLocation?.title,
      odoo_warehouse_id: userDetails?.warehouseLocation?.odoo_warehouse_id,
      address: {
        unit: userDetails?.warehouseLocation?.address?.unit,
        street: userDetails?.warehouseLocation?.address?.street,
        suburb: userDetails?.warehouseLocation?.address?.suburb,
        state: userDetails?.warehouseLocation?.address?.state,
        postcode: userDetails?.warehouseLocation?.address?.postcode,
        city: userDetails?.warehouseLocation?.address?.city,
      },
    };

    const shippingAddress =
      userDetails?.shipping_addresses?.map((address: any) => ({
        documentId: address?.documentId,
        name: {
          first_name: address?.name?.first_name,
          middle_name: address?.name?.middle_name,
          last_name: address?.name?.last_name,
        },
        street1: address?.street1,
        street2: address?.street2,
        city: address?.city,
        state: address?.state,
        zip_code: address?.zip_code,
        phone: address?.phone,
        country: address?.country,
        isActive: address?.isActive,
      })) || [];

    const concatUsersData = {
      ...user,
      role: userRawData?.role,
      user_level: userDetails?.level,
      business_name: userRawData?.business_name,
      business_number: userRawData?.business_number,
      business_type: userRawData?.business_type,
      phone: userRawData?.phone,
      carts: userRawData?.carts || [],
      warehouseLocation: warehouseLocation,
      account_detail: {
        name: name,
        shipping_addresses: shippingAddress,
      },
    };

    const oneMonth = 60 * 60 * 24 * 30;
    const oneDay = 60 * 60 * 24;
    const expiresIn = remember ? oneMonth : oneDay;
    const userData = JSON.stringify({
      ...user,
      role: userRawData?.role,
    });

    const cookieOptions = {
      path: '/',
      maxAge: expiresIn,
      // httpOnly: true,
    };

    cookieStore.set('a-token', token!, cookieOptions);
    cookieStore.set('a-user', userData, cookieOptions);

    return { data: { token, user: concatUsersData } };
  } catch (error: unknown) {
    if (error instanceof ApolloError) {
      return {
        error: {
          message: error.message,
          type: 'apollo_error',
        },
      };
    }

    if (error instanceof Error) {
      return {
        error: {
          message: error.message,
          type: 'error',
        },
      };
    }

    console.log('UNKNOWN ERROR');
    return { error: { message: 'Unknown error', type: 'error' } };
  }
};

export const updateAccountStatus = async (
  userId: string,
  accountStatus: string
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.updateUser,
      variables: {
        documentId: userId,
        data: {
          account_status:
            accountStatus as InputMaybe<Enum_Userspermissionsuser_Account_Status>,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    revalidatePath(`/admin/users/${userId}`);
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);
    throw Error(error.message);
  }
};

export const getUsers = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const response = await client.query({
      query: USERS_OPERATIONS.Queries.users,
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error('GraphQL Query Error:', error);
  }
};

export const getUserDetails = async (documentId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  console.log('TOKEN: ', token);

  try {
    const response = await client.query({
      query: USERS_OPERATIONS.Queries.usersPermissionsUser,
      variables: {
        documentId,
      },
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    return response;
  } catch (error) {
    console.error('GraphQL Query Error:', error);
    return null;
  }
};

export const approveUser = async (formData: FormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  const documentId = formData.get('documentId') as string;
  const accountStatus = formData.get('accountStatus') as string;
  const odooUserId = formData.get('odooUserId') as string;
  const userLevel = formData.get('userLevel') as string;
  const businessType = formData.get('businessType') as string;

  try {
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.approveUser,
      variables: {
        documentId,
        data: {
          businessType,
          userLevel,
          odooUserId,
          accountStatus: accountStatus,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    revalidatePath('/admin/users');
    return { data: response.data };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
};

export const logoutUser = async () => {
  const cookieStore = await cookies();

  // Clear all auth-related cookies
  cookieStore.delete('a-token');
  cookieStore.delete('a-user');

  // Revalidate relevant paths
  revalidatePath('/', 'layout');
  redirect('/auth/login');
};
