import { graphql } from '@/lib/gql';

const schema = {
  Query: {},
  Mutation: {
    createOrder: graphql(`
      mutation CreateOrder($data: OrderInput!) {
        createOrder(data: $data) {
          documentId
          createdAt
          updatedAt
        }
      }
    `),
  },
};

export default schema;
