import { gql } from '@apollo/client';

const schema = {
  Queries: {
    users: gql(`
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
    registerUser: gql(`
      mutation RegisterUser($email: String!, $username: String!, $password: String!, $level: String!) {
        registerUser(email: $email, username: $username, password: $password, level: $level) {
          error
          success
          data {
            id
            email
            username
            level
          }
        }
      }
    `),
    loginUser: gql(`
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
