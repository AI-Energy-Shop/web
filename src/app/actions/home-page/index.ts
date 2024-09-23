"use server";

import { client } from "../../../apollo/client";
import { HomePageRes } from "../../../libs/types";
import HOMEPAGE_OPERATIONS from "../../../graphql/home-page";

export const homePage = async (): Promise<HomePageRes> => {
  try {
    const res = await client.query<HomePageRes>({
      query: HOMEPAGE_OPERATIONS.Queries.homePage,
    });

    return res.data;
  } catch (error: any) {
    return error.message;
  }
};
