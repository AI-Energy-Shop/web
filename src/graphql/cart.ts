import { graphql } from '@/lib/gql';

const schema = {
  Query: {
    carts: graphql(`
      query Carts($filters: CartFiltersInput, $pagination: PaginationArg) {
        carts(filters: $filters, pagination: $pagination) {
          documentId
          item {
            id
            title
            quantity
            price
            odoo_product_id
            model
            image
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
  },
  Mutation: {
    addToCart: graphql(`
      mutation AddToCart($data: CartItemInput!) {
        addToCart(data: $data) {
          documentId
          item {
            id
            title
            quantity
            price
            odoo_product_id
            model
            image
          }
          user {
            username
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    updateCart: graphql(`
      mutation UpdateCart($documentId: ID!, $data: CartItemInput!) {
        updateCart(documentId: $documentId, data: $data) {
          documentId
          item {
            id
            title
            price
            model
            image
            quantity
            odoo_product_id
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    removeFromCart: graphql(`
      mutation DeleteCartItem($documentId: ID!) {
        deleteCartItem(documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};

export default schema;
