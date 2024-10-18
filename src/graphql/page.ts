import { gql } from '@apollo/client';

const schema = {
  Queries: {
    pages: gql(`
			query Pages {
        pages {
          documentId
          title
          slug
        }
      }
    `),
    getPage: gql(`
      query GetPage($slug: String!) {
        getPage(slug: $slug) {
          title
          slug
          sections {
            ... on ComponentSectionsWarehouseLocations {
              __typename
              id
              heading
              sub_heading
              locations {
                id
                name
                address
                office_time
                warehouse_time
                google_maps_link
              }
            }
            
            ... on ComponentSectionsImageSlider {
              __typename
              id
              animation_duration
              display_button
              slides {
                id
                title
                description
                image {
                  alternativeText
                  name
                  url
                }
                type
              }
            }
            ... on ComponentSectionsContactUs {
              id
              heading
              description
              button_title
              background_image {
                alternativeText
                name
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
                alternativeText
                name
                url
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
                alternativeText
                name
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
        }
      }
    `),
  },
};

export default schema;
