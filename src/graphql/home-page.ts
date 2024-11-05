import { graphql } from '@/lib/gql';

const schema = {
  Queries: {
    homePage: graphql(`
      query HomePage {
        homePage {
          data {
            attributes {
              banner_images {
                id
                link
                image_type
                image {
                  data {
                    attributes {
                      url
                      name
                      alternativeText
                    }
                  }
                }
              }
              about_section {
                id
                heading
                sub_heading
                description
                button_title
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
              contactus_section {
                heading
                description
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
      }
    `),
  },
};

export default schema;
