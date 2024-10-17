import { gql } from '@apollo/client';

const schema = {
  Queries: {
    pages: gql(`
			query Pages {
        pages {
          title
          sections {
            ... on ComponentSectionsContactUsSection {
              __typename
              id
              heading
              description
              button_title
              background_image {
                url
                name
                alternativeText
              }
            }
            ... on ComponentComponentBannerImages {
              __typename
              animation_duration
              display_button
              id
              slides {
                description
                id
                title
                type
                image {
                  url
                  name
                  alternativeText
                }
              }
            }
            ... on ComponentSectionsAboutSection {
              __typename
              id
              heading
              sub_heading
              description
              button_title
              background_image {
                url
                name
                alternativeText
              }
            }
            ... on ComponentSectionsWarehouseLocations {
              __typename
              id
              heading
              sub_heading
              locations {
                id
                address
                warehouse_time
                office_time
                google_maps_link
              }
            }
            ... on ComponentSectionsContactDetailsSection {
              __typename
              id
              left_heading
              left_sub_heading
              right_heading
              right_sub_heading
            }
            ... on ComponentFormInquiry {
              id
              __typename
              heading
              inputs {
                id
                label
                type
                placeholder
                required
              }
            }
          }
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
          address
          office_time
          warehouse_time
          google_maps_link
        }
      }
      ... on ComponentSectionsContactUsSection {
        __typename
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
      ... on ComponentSectionsContactDetailsSection {
        __typename
        id
        left_heading
        left_sub_heading
        right_heading
        right_sub_heading
      }
      ... on ComponentSectionsAboutSection {
        __typename
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
      ... on ComponentFormNewsletter {
        __typename
        id
        heading
        sub_heading
        sub_text
        inputs {
          id
          label
          type
          placeholder
          required
        }
        button_title
        image {
          alternativeText
          name
          url
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
