import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

const schema = {
  Query: {
    address: graphql(`
      query Address($documentId: ID!) {
        usersPermissionsUser(documentId: $documentId) {
          addresses {
            city
            country
            documentId
            isActive
            mobile
            odoo_address_id
            phone
            createdAt
            state
            street1
            street2
            title
            zip_code
          }
        }
      }
    `),
  },
  Mutation: {
    addAdress: graphql(`
      mutation CreateAddress($data: AddressInput!) {
        createAddress(data: $data) {
          documentId
        }
      }
    `),
    deleteAddress: graphql(`
      mutation DeleteAddress($documentId: ID!) {
        deleteAddress(documentId: $documentId) {
          documentId
        }
      }
    `),
    updateAddress: graphql(`
      mutation UpdateAddress($data: AddressInput!, $documentId: ID!) {
        updateAddress(data: $data, documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};

export default schema;
