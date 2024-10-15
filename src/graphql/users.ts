import { gql } from '@apollo/client';

const schema = {
  Queries: {},
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
