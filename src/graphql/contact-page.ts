import { gql } from '@apollo/client';

const schema = {
  Queries: {
    contactPage: gql(`
     	query ContactPage {
				contactPage {
					data {
						attributes {
							contact_details_section {
								id
								left_subheading
								left_description
								right_subheading
								right_description
							}
							warehouse_location{
								heading
								sub_heading
								locations {
									id
									name
									address
									warehouse_time
									office_time
									link
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
