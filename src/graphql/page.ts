import { graphql } from '@/lib/gql';

const schema = {
  Queries: {
    pages: graphql(`
      query Pages {
        pages {
          documentId
          title
          slug
        }
      }
    `),
    getPage: graphql(`
      query GetPage($slug: String!) {
        getPage(slug: $slug) {
          documentId
          title
          slug
          sections {
            ... on ComponentSectionsWarehouseLocations {
              id
              heading
              sub_heading
              locations {
                id
                address
                warehouse_time
                office_time
                google_maps_link
                name
              }
            }
            ... on ComponentSectionsContactUs {
              id
              heading
              description
              button_title
              background_image {
                name
                alternativeText
                url
              }
            }
            ... on ComponentSectionsContactDetails {
              id
              left_heading
              left_sub_heading
              right_heading
              right_sub_heading
            }
            ... on ComponentSectionsAbout {
              id
              heading
              sub_heading
              description
              button_title
              background_image {
                name
                alternativeText
                url
              }
            }
            ... on ComponentSectionsImageSlider {
              id
              animation_duration
              display_button
              slides {
                id
                title
                description
                link
                image {
                  name
                  alternativeText
                  url
                }
                type
              }
            }
            ... on ComponentFormNewsletter {
              id
              heading
              sub_heading
              inputs {
                id
                label
                type
                placeholder
                required
              }
              sub_text
              button_title
              image {
                name
                alternativeText
                url
              }
            }
            ... on ComponentFormInquiry {
              id
              heading
              button_title
              inputs {
                id
                label
                type
                placeholder
                required
              }
            }
            ... on Error {
              code
              message
            }
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
  },
};

export default schema;
