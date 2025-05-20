import { graphql } from '@/lib/gql';

const schema = {
  Mutation: {
    createCreditCard: graphql(`
      mutation CreateCreditCard($data: CreditCardInput!) {
        createCreditCard(data: $data) {
          documentId
        }
      }
    `),
    updateCreditCardDefault: graphql(`
      mutation UpdateCreditCard($data: CreditCardInput!, $documentId: ID!) {
        updateCreditCard(data: $data, documentId: $documentId) {
          documentId
        }
      }
    `),
    deleteCreditCard: graphql(`
      mutation DeleteCreditCard($documentId: ID!) {
        deleteCreditCard(documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};

export default schema;
