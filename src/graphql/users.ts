import { graphql } from '@/lib/gql';

const schema = {
  Queries: {
    user: graphql(`
      query User($filters: UserFiltersInput) {
        user(filters: $filters) {
          documentId
          email
          account_status
          blocked
          username
          account_detail {
            business_name
            phone
            shipping_addresses {
              id
              phone
              name {
                first_name
                middle_name
                last_name
              }
              street
              suburb
              state_territory
              postcode
              country
              isActive
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
          account_detail {
            documentId
            level
            phone
            user_type
            first_name
            middle_name
            last_name
            business_name
          }
        }
      }
    `),
    userDetails: graphql(`
      query UsersPermissionsUser($documentId: ID!) {
        usersPermissionsUser(documentId: $documentId) {
          documentId
          username
          email
          provider
          blocked
          account_status
          account_detail {
            documentId
            level
            user_type
            first_name
            middle_name
            last_name
            business_name
            phone
            odoo_user_id
          }
        }
      }
    `),
  },
  Mutations: {
    registerUser: graphql(`
      mutation RegisterUser($data: RegisterUserInput!) {
        registerUser(data: $data) {
          error
          success
          statusText
        }
      }
    `),
    loginUser: graphql(`
      mutation Login($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
          jwt
          user {
            id
            username
            email
            confirmed
            blocked
          }
        }
      }
    `),
    updateUserAccountStatus: graphql(`
      mutation UserApproval($data: UserApprovalRequestInputArgs!) {
        userApproval(data: $data) {
          error
          success
          statusText
        }
      }
    `),
  },
};

export default schema;
