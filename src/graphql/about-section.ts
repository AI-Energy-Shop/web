import { gql } from "@apollo/client";

const schema = {
  Queries: {
    getAboutSection: gql(`
     	query AboutSection {
				aboutSection {
					data {
						attributes {
							heading
							sub_heading
							paragraph
							button_title
							baground_image {
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
