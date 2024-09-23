"use server";

import { client } from "@/apollo/client";
import CONTACTPAGE_OPERAIONS from "@/graphql/contact-page";
import { ContactPageRes } from "@/libs/types";

export const getContactPage = async (): Promise<ContactPageRes> => {
  try {
    const res = await client.query<ContactPageRes>({
      query: CONTACTPAGE_OPERAIONS.Queries.contactPage,
    });

    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
