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

const client = getClient();

export const registerUser = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const userType = formData.get('userType') as string;
  const businessNumber = formData.get('businessNumber') as string;
  const businessName = formData.get('businessName') as string;
  const street = formData.get('street') as string;
  const suburb = formData.get('suburb') as string;
  const state = formData.get('state') as string;
  const postalCode = formData.get('postalCode') as string;
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
          userType,
          phone,
          street,
          suburb,
          state: state,
          postalCode: postalCode,
        },
      },
    });

    if (response.errors) {
      return { success: false, error: response.errors[0].message };
    }

    return {
      data: response.data,
    };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const cookieStore = cookies();
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.loginUser,
      variables: {
        input: {
          identifier: email,
          password: password,
          provider: 'local',
        },
      },
    });

    if (!response.data?.login) {
      return { success: false, error: 'Login failed' };
    }

    const token = response?.data.login.jwt;
    const user = response?.data.login.user;

    const userRes = await client.query({
      query: USERS_OPERATIONS.Queries.user,
      variables: {
        filters: {
          username: user.username,
          email: user.email,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const userDetails = userRes?.data.user?.account_detail;

    const newUser = {
      ...user,
      role: userRes.data.user?.role,
      account_detail: {
        name: userDetails?.name,
      },
      warehouse_location: userDetails?.warehouse_location,
      shipping_addresses:
        userDetails?.shipping_addresses?.map((address) => ({
          id: address?.id,
          name: {
            first_name: address?.name?.first_name,
            middle_name: address?.name?.middle_name,
            last_name: address?.name?.last_name,
          },
          street: address?.street,
          suburb: address?.suburb,
          state_territory: address?.state_territory,
          postcode: address?.postcode,
          phone: address?.phone,
          country: address?.country,
          isActive: address?.isActive,
        })) || [],
    };

    cookieStore.set('a-token', token!, {
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
      httpOnly: true,
      // sameSite: 'strict',
      // secure: process.env.NODE_ENV === 'production' ? true : false,
    });

    cookieStore.set('a-user', JSON.stringify(user!), {
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
      httpOnly: true,
      // sameSite: 'strict',
      // secure: process.env.NODE_ENV === 'production' ? true : false,
    });

    return { success: true, data: { token, user: newUser } }; // Return success indicator
  } catch (error: any) {
    if (error.cause.response.status === 401) {
      return { success: false, error: 'Please wait for approval' };
    }
    return { success: false, error: error.message };
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
    revalidatePath(`/admin/dashboard/users/${userId}`);
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
      query: USERS_OPERATIONS.Queries.userDetails,
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

export const logoutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('a-token');
  cookieStore.delete('a-user');
  cookieStore.delete('reduxState');
  redirect('/auth/login');
};

export const approveUser = async (formData: FormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  const documentId = formData.get('documentId') as string;
  const accountStatus = formData.get('accountStatus') as string;
  const odooUserId = formData.get('odooUserId') as string;
  const userLevel = formData.get('userLevel') as string;
  const userType = formData.get('userType') as string;

  try {
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.approveUser,
      variables: {
        documentId,
        data: {
          userType,
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

    return { data: response.data };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
};
