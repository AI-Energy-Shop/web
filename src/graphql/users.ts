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
          blocked
          account_status
          account_detail {
            documentId
            level
            user_type
            odoo_user_id
            first_name
            middle_name
            last_name
            business_name
            position
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
            odoo_user_id
            first_name
            middle_name
            last_name
            business_name
            position
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
