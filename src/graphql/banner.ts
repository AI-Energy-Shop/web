import { gql } from "@apollo/client";

const schema = {
  Queries: {
    getBannerImages: gql(`
     	query {
				bannerImages{
					data{
						id
						attributes {
						url
							title
							createdAt
							image {
								data {
									attributes {
										url
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
