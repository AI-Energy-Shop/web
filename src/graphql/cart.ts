import { graphql } from '@/lib/gql';

const schema = {
  Query: {
    carts: graphql(`
      query Carts($filters: CartFiltersInput) {
        carts(filters: $filters) {
          documentId
          item {
            title
            quantity
            price
            odoo_product_id
            reference_id
            image
          }
          updatedAt
          createdAt
        }
      }
    `),
  },
  Mutation: {},
};

export default schema;
