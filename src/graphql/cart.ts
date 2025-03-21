import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

const schema = {
  Query: {
    carts: gql(`
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
        }
      }
    `),
  },
  Mutation: {
    createCart: gql(`
      mutation CreateCart($data: CartInput!) {
        createCart(data: $data) {
          documentId
          item {
            productID
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
        }
      }
    `),
    updateCart: gql(`
      mutation UpdateCart($documentId: ID!, $data: CartInput!) {
        updateCart(documentId: $documentId, data: $data) {
          documentId
          item {
            productID
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
        }
      }
    `),
    deleteCart: graphql(`
      mutation DeleteCart($documentId: ID!) {
        deleteCart(documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};

export default schema;
