import { graphql } from '@/lib/gql';

const schema = {
  Query: {
    cartItems: graphql(`
      query Carts {
        carts {
          documentId
          title
          image
          reference_id
          odoo_product_id
          quantity
          price
        }
      }
    `),
  },
  Mutation: {
    createCartItem: graphql(`
      mutation CreateCart($data: CartInput!) {
        createCart(data: $data) {
          documentId
          title
          image
          reference_id
          quantity
          odoo_product_id
          price
          createdAt
        }
      }
    `),
  },
};

export default schema;
