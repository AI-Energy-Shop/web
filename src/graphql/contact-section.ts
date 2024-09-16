import { gql } from "@apollo/client";

const schema = {
  Queries: {
    getContactSection: gql(`
     	query {
				contactusSection {
					data {
						attributes {
							heading
							paragraph
							button_title
							image {
								data {
									attributes {
										alternativeText
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
