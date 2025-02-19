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
            model
            image
          }
          updatedAt
          createdAt
        }
      }
    `),
  },
  Mutation: {
    addToCart: graphql(`
      mutation CreateCart($data: CartInput!) {
        createCart(data: $data) {
          documentId
          item {
            title
            quantity
            price
            odoo_product_id
            model
            image
          }
        }
      }
    `),
    updateCart: graphql(`
      mutation UpdateCart($documentId: ID!, $data: CartInput!) {
        updateCart(documentId: $documentId, data: $data) {
          documentId
          item {
            image
            odoo_product_id
            price
            quantity
            model
            title
          }
        }
      }
    `),
    removeFromCart: graphql(`
      mutation DeleteCart($documentId: ID!) {
        deleteCart(documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};

export default schema;
