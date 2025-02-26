'use server';
import USERS_OPERATIONS from '@/graphql/users';
import { safeAction } from '@/lib/safe-action';
import { redirect } from 'next/navigation';
import { registerUserSchema } from '@/lib/validation-schema/register-form';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import { updateUserStatusSchema } from '@/lib/validation-schema/update-user-status-form';
import { revalidatePath } from 'next/cache';

const client = getClient();

export const registerUser = safeAction
  .schema(registerUserSchema)
  .action(
    async ({
      parsedInput: {
        email,
        username,
        password,
        firstName,
        middleName,
        lastName,
        businessName,
        userType,
      },
    }) => {
      const response = await client.mutate({
        mutation: USERS_OPERATIONS.Mutations.registerUser,
        variables: {
          data: {
            firstName,
            middleName,
            lastName,
            userType,
            businessName,
            email,
            username,
            password,
          },
        },
      });

      // TODO(ROI) refactor this
      if (!response?.data?.registerUser?.success) {
        const usernameError =
          (response?.data?.registerUser?.error as string)
            .toLowerCase()
            .includes('username') && response?.data?.registerUser?.error;
        const emailError =
          (response?.data?.registerUser?.error as string)
            .toLowerCase()
            .includes('email') && response?.data?.registerUser?.error;

        return {
          error: {
            username: usernameError,
            email: emailError,
          },
        };
      } else {
        redirect('/auth/approval');
      }
    }
  );

// *(ROI) Logic of the user is in the client
export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const cookieStore = await cookies();

  try {
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
      return {
        error: 'No user found!',
      };
    }

    const token = response?.data.login.jwt;
    const user = response?.data.login.user;

    cookieStore.set('a-token', token!, {
      path: '/',
      // maxAge: 604800, // 7 days
      maxAge: 60 * 60 * 12, // 12 hours
      httpOnly: true,
      sameSite: 'strict',
    });

    cookieStore.set('a-user', JSON.stringify(user!), {
      path: '/',
      // maxAge: 604800, // 7 days
      maxAge: 60 * 60 * 12, // 12 hours
      httpOnly: true,
      sameSite: 'strict',
    });

    return {
      message: 'Login Success!',
    };
  } catch (error: any) {
    return {
      error: error.message || '',
    };
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
