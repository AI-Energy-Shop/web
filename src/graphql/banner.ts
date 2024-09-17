import { gql } from "@apollo/client";

const schema = {
  Queries: {
    getBannerImages: gql(`
     	query {
				bannerImage {
					data {
						attributes {
							title
							images {
								image {
									data {
										attributes {
											url
											alternativeText
											name
										}
									}
								}
							}
						}
					}
				}
    	}
    `),
  },
};

export default schema;
