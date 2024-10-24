'use server';
import USERS_OPERATIONS from '@/graphql/users';
import { client } from '@/apollo/client';
import { safeAction } from '@/lib/safe-action';
import { redirect } from 'next/navigation';
import { registerUserSchema } from '@/lib/validation-schema/register-form';
import { loginUserSchema } from '@/lib/validation-schema/login-form';
import { cookies } from 'next/headers';

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
      if (!response.data.registerUser.success) {
        const username =
          (response.data.registerUser.error as string)
            .toLowerCase()
            .includes('username') && response.data.registerUser.error;
        const email =
          (response.data.registerUser.error as string)
            .toLowerCase()
            .includes('email') && response.data.registerUser.error;

        return {
          error: {
            username,
            email,
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

      if (response.data.login.user.confirmed) {
        isSuccessfull = true;

        cookieStore.set('a-token', response.data.login.jwt, {
          secure: true,
          httpOnly: true,
          sameSite: 'strict',
        });
      } else {
        redirect('/auth/approval');
      }
    } catch (error) {
      throw error;
    }

    if (isSuccessfull) {
      redirect('/admin/dashboard');
    }
  });

export const getUsers = safeAction.action(async () => {
  const response = await client.query({
    query: USERS_OPERATIONS.Queries.users,
  });

  const data = response.data;

  return data;
});
