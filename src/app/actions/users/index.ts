'use server';
import USERS_OPERATIONS from '@/graphql/users';
import { safeAction } from '@/lib/safe-action';
import { redirect } from 'next/navigation';
import { registerUserSchema } from '@/lib/validation-schema/register-form';
import { loginUserSchema } from '@/lib/validation-schema/login-form';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';

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
    const cookieStore = await cookies();
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

      if (response.data?.login.user.confirmed) {
        isSuccessfull = true;

        const token = response?.data.login.jwt;

        cookieStore.set('a-token', token!, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
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
