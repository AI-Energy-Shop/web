'use server';
import USERS_OPERATIONS from '@/graphql/users';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import { redirect } from 'next/navigation';
import { Enum_Userspermissionsuser_Account_Status, InputMaybe } from '@/lib/gql/graphql';
import { revalidatePath } from 'next/cache';

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

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
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

    if (response.errors || !response.data) {
      return { error: response.errors?.[0]?.message || 'Login failed' };
    }

    const token = response?.data.login.jwt;
    const user = response?.data.login.user;
    const cookieStore = cookies();

    const userRes = await client.query({
      query: USERS_OPERATIONS.Queries.usersPermissionsUser,
      variables: {
        documentId: user.documentId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const userDetails = userRes?.data.usersPermissionsUser?.account_detail;

    const newUser = {
      ...user,
      role: userRes.data.usersPermissionsUser?.role,
      user_level: userDetails?.level,
      business_name: userRes.data.usersPermissionsUser?.business_name,
      business_number: userRes.data.usersPermissionsUser?.business_number,
      business_type: userRes.data.usersPermissionsUser?.business_type,
      phone: userRes.data.usersPermissionsUser?.phone,
      account_detail: {
        name: userDetails?.name,
        shipping_addresses:
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
          })) || [],
      },
      carts: userRes.data.usersPermissionsUser?.carts || [],
      warehouse_location: userDetails?.warehouse_location,
    };

    const cookieOptions = {
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
      httpOnly: true,
      // sameSite: 'strict',
      // secure: process.env.NODE_ENV === 'production' ? true : false,
    };

    cookieStore.set('a-token', token!, cookieOptions);
    cookieStore.set('a-user', JSON.stringify(user!), cookieOptions);

    return { data: { token, user: newUser } }; // Return success indicator
  } catch (error: any) {
    console.error('LOGIN ERROR: ', error.message);
    if (error && error?.cause?.response?.status === 401) {
      return { error: 'Please wait for approval' };
    }
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

export const updateAccountStatus = async (userId: string, accountStatus: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.updateUser,
      variables: {
        documentId: userId,
        data: {
          account_status: accountStatus as InputMaybe<Enum_Userspermissionsuser_Account_Status>,
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

    return response?.data?.usersPermissionsUser;
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
