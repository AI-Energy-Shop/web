'use server';
import USERS_OPERATIONS from '@/graphql/users';
import { safeAction } from '@/lib/safe-action';
import { redirect } from 'next/navigation';
import { registerUserSchema } from '@/lib/validation-schema/register-form';
import { loginUserSchema } from '@/lib/validation-schema/login-form';
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
export const loginUser = safeAction
  .schema(loginUserSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const cookieStore = cookies();
    let isSuccessfull = false;

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

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (response.data?.login) {
        isSuccessfull = true;
        const token = response?.data.login.jwt;
        const user = response?.data.login.user;

        cookieStore.set('a-token', token!, {
          path: '/',
          // maxAge: 604800, // 7 days
          maxAge: 60 * 60 * 12,
          httpOnly: true,
          sameSite: 'strict',
        });

        cookieStore.set('a-user', JSON.stringify(user!), {
          path: '/',
          // maxAge: 604800, // 7 days
          maxAge: 60 * 60 * 12,
          httpOnly: true,
          sameSite: 'strict',
        });
      }
    } catch (error) {
      throw error;
    }

    if (isSuccessfull) {
      redirect('/admin/dashboard');
    }
  });

export const updateAccountStatus = safeAction
  .schema(updateUserStatusSchema)
  .action(
    async ({
      parsedInput: { userId, email, accountStatus, odooId, userPricingLevel },
    }) => {
      const cookieStore = cookies();
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
  const cookieStore = cookies();
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
  const cookieStore = cookies();
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
