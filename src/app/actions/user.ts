'use server';
import USERS_OPERATIONS from '@/graphql/users';
import { safeAction } from '@/lib/safe-action';
import { registerUserSchema } from '@/lib/validation-schema/register-form';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import { updateUserStatusSchema } from '@/lib/validation-schema/update-user-status-form';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const client = getClient();

export const registerUser = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const userType = formData.get('userType') as string;
  const businessNumber = formData.get('businessNumber') as string;
  const businessName = formData.get('businessName') as string;

  try {
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.registerUser,
      variables: {
        data: {
          email,
          username,
          password,
          businessNumber,
          userType,
          businessName,
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
    return { success: false, error: error.message };
  }
};

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
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
    console.error('GraphQL Query Error:', error);
    return { success: false, error: error.message };
  }
}

export const updateAccountStatus = safeAction
  .schema(updateUserStatusSchema)
  .action(
    async ({
      parsedInput: { userId, email, accountStatus, odooId, userPricingLevel },
    }) => {
      const cookieStore = await cookies();
      const token = cookieStore.get('a-token');

      try {
        const response = await client.mutate({
          mutation: USERS_OPERATIONS.Mutations.updateUserAccountStatus,
          variables: {
            data: {
              email: email,
              accountStatus: accountStatus,
              user: {
                odooId: odooId,
                userPricingLevel: userPricingLevel,
              },
            },
          },
          context: {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          },
        });
        revalidatePath(`/admin/dashboard/users/${userId}`);
        return response?.data?.userApproval;
      } catch (error) {
        console.error('GraphQL Query Error:', error);
      }
    }
  );

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
  }
};

export const logoutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('a-token');
  cookieStore.delete('a-user');
  cookieStore.delete('reduxState');
  redirect('/auth/login');
};
