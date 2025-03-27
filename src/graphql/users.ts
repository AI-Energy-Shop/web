import { graphql } from '@/lib/gql';

const schema = {
  Queries: {
    usersPermissionsUser: graphql(`
      query UsersPermissionsUser($documentId: ID!) {
        usersPermissionsUser(documentId: $documentId) {
          documentId
          email
          account_status
          blocked
          username
          business_name
          business_number
          user_type
          phone
          role {
            name
          }
          carts {
            documentId
            item {
              productID
              title
              quantity
              price
              odoo_product_id
              model
              image
            }
          }
          addresses {
            documentId
            street1
            street2
            state
            city
            zip_code
            country
            phone
            isActive
            name {
              first_name
              middle_name
              last_name
            }
            createdAt
            updatedAt
          }
          account_detail {
            phone
            level
            odoo_user_id
            name {
              first_name
              middle_name
              last_name
            }
            shipping_addresses {
              documentId
              phone
              street1
              street2
              city
              state
              zip_code
              country
              isActive
              name {
                first_name
                middle_name
                last_name
              }
            }
            warehouse_location {
              title
              address {
                city
                street
                suburb
                state_territory
                postcode
                country
              }
            }
          }
        }
      }
    `),
    users: graphql(`
      query UsersPermissionsUsers {
        usersPermissionsUsers {
          documentId
          username
          email
          provider
          blocked
          account_status
          business_name
          business_number
          user_type
          phone
          addresses {
            documentId
            street1
            street2
            city
            state
            zip_code
            country
            isActive
            phone
            city
          }
          account_detail {
            documentId
            level
            phone
            name {
              first_name
              middle_name
              last_name
            }
          }
          role {
            name
          }
        }
      }
    `),
    // userDetails: graphql(`
    //   query UsersPermissionsUser($documentId: ID!) {
    //     usersPermissionsUser(documentId: $documentId) {
    //       documentId
    //       username
    //       email
    //       provider
    //       blocked
    //       account_status
    //       business_name
    //       business_number
    //       role {
    //         name
    //       }
    //       account_detail {
    //         documentId
    //         level
    //         phone
    //         odoo_user_id
    //         name {
    //           first_name
    //           middle_name
    //           last_name
    //         }
    //         warehouse_location {
    //           title
    //           address {
    //             city
    //             street
    //             suburb
    //             state_territory
    //             postcode
    //             country
    //           }
    //         }
    //       }
    //     }
    //   }
    // `),
  },
  Mutations: {
    login: graphql(`
      mutation Login($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
          jwt
          user {
            documentId
            email
            confirmed
            blocked
            username
          }
        }
      }
    `),
    registerUser: graphql(`
      mutation RegisterUser($data: RegisterUserInput!) {
        registerUser(data: $data) {
          documentId
        }
      }
    `),
    approveUser: graphql(`
      mutation ApprovedUser($data: ApprovedUserInput!, $documentId: ID!) {
        approvedUser(data: $data, documentId: $documentId) {
          documentId
          email
        }
      }
    `),
    updateUser: graphql(`
      mutation UpdateUser($documentId: ID!, $data: UsersPermissionsUserInput!) {
        updateUser(documentId: $documentId, data: $data) {
          account_status
        }
      }
    `),
  },
};

export default schema;
