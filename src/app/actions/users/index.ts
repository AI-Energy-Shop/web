'use server';
import USERS_OPERATIONS from '@/graphql/users';
import { client } from '@/apollo/client';
import { safeAction } from '@/lib/safe-action';
import { redirect } from 'next/navigation';
import { RegisterUserSchema } from '@/lib/schema/register-form';

export const registerUser = safeAction
  .schema(RegisterUserSchema)
  .action(async ({ parsedInput: { email, username, password } }) => {
    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.registerUser,
      variables: {
        email: email,
        username: username,
        password: password,
        level: 'SMALL',
      },
    });
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
  });

export async function loginUser(formData: any) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.loginUser,
      variables: {
        input: {
          identifier: email,
          password: password,
        },
      },
    });

    console.log(response);
  } catch (error: any) {}
}
