import { gql } from '@apollo/client';

const schema = {
  Queries: {
    newsLetterSection: gql(`
			query NewsletterForm {
				newsletterForm {
					data {
					attributes {
						heading
						paragraph
						sub_text
						button_title
						privacy_link
						form_inputs {
						input {
							id
							title
							placeholder
						}
						}
						background_image {
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
