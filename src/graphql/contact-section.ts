import { gql } from "@apollo/client";

const schema = {
  Queries: {
    getContactSection: gql(`
     	query ContactusSection {
				contactusSection {
					data {
						attributes {
							heading
							paragraph
							button_title
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
    `),
  },
};

export default schema;
