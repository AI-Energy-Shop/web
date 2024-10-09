"use server";
import USERS_OPERATIONS from "@/graphql/users";
import { client } from "@/apollo/client";
import zod from "zod";

const schema = zod.object({
  email: zod.string().regex(/^\S+@\S+$/),
  username: zod.string(),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  repassword: zod
    .string()
    .min(8, { message: "Confirm password must be at least 8 characters" }),
});

export async function registerUser(state: any, formData: any) {
  try {
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const repassword = formData.get("repassword");

    schema.parse({
      email,
      username,
      password,
      repassword,
    });

    if (!email || !username || !password) {
      return {
        error: "All fields are required",
        success: false,
      };
    }

    if (password !== repassword) {
      return {
        error: "Passwords do not match",
        success: false,
      };
    }

    const response = await client.mutate({
      mutation: USERS_OPERATIONS.Mutations.registerUser,
      variables: {
        email: email,
        username: username,
        password: password,
        level: "SMALL",
      },
    });

    return response.data.registerUser;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}

export async function loginUser(formData: any) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

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
