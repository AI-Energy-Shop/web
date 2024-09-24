"use server";

import { client } from "@/apollo/client";
import HOMEPAGE_OPERATIONS from "@/graphql/home-page";
import { HomePageRes } from "@/libs/types";

export const homePage = async (): Promise<HomePageRes> => {
  try {
    const res = await client.query<HomePageRes>({
      query: HOMEPAGE_OPERATIONS.Queries.homePage,
    });

    return res.data;
  } catch (error: any) {
    console.error("GraphQL Query Error:", error);

    return error.message;
  }
};
