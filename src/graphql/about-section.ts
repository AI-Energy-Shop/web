import { gql } from "@apollo/client";

const schema = {
  Queries: {
    getAboutSection: gql(`
     	query {
				aboutSection{
					data {
						attributes {
							heading
							sub_heading
							paragraph
							button_title
							createdAt
							updatedAt
							publishedAt
							baground_image {
								data {
									attributes {
										url
										name
										alternativeText
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
