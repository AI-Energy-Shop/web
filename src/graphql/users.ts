import { graphql } from '@/lib/gql';

const schema = {
  Queries: {
    users: graphql(`
      query UsersPermissionsUsers {
        usersPermissionsUsers {
          documentId
          username
          email
          provider
          confirmed
          blocked
          account_status
          account_details {
            documentId
            level
            user_type
            odoo_id
            first_name
            middle_name
            last_name
            business_name
            position
            createdAt
            updatedAt
            publishedAt
            locale
            user {
              documentId
              username
              email
              provider
              confirmed
              blocked
              createdAt
              updatedAt
              publishedAt
              locale
            }
          }
          createdAt
          updatedAt
          publishedAt
          locale
        }
      }
    `),
  },
  Mutations: {
    registerUser: graphql(`
      mutation RegisterUser($data: RegisterUserInput!) {
        registerUser(data: $data) {
          error
          data {
            documentId
            username
            email
          }
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
            email
            blocked
            username
            confirmed
            role {
              id
              name
              description
              type
            }
          }
        }
      }
    `),
  },
};

export default schema;
