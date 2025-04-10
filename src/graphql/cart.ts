import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

const schema = {
  Query: {
    carts: gql(`
      query Carts($filters: CartFiltersInput, $pagination: PaginationArg) {
        carts(filters: $filters, pagination: $pagination) {
          documentId
          product {
            documentId
            name
            model
            odoo_product_id
            price_lists {
              price
              min_quantity
              max_quantity
            }
            inventories {
              documentId
              name
              location_code
              quantity
            }
            images {
              url
              alternativeText
              width
              height
            }
          }
          user {
            documentId
            username
          }
          quantity
          createdAt
          updatedAt
        }
      }
    `),
    cartProductQuantity: graphql(`
      query GetCartProductQuantity($documentId: ID!) {
        usersPermissionsUser(documentId: $documentId) {
          carts {
            documentId
            quantity
            product {
              documentId
              inventories {
                documentId
                name
                location_code
                quantity
              }
            }
          }
        }
      }
    `),
  },
  Mutation: {
    createCart: gql(`
      mutation CreateCart($data: CartInput!) {
        createCart(data: $data) {
          documentId
          product {
            documentId
            odoo_product_id
            name
            model
            price_lists {
              price
              sale_price
              min_quantity
              max_quantity
              user_level
            }
            inventories {
              documentId
              name
              location_code
              quantity
            }
            images {
              url
              alternativeText
              width
              height
            }
          }
          user {
            documentId
            username
          }
          quantity
          createdAt
          updatedAt
        }  
      }
    `),
    updateCart: gql(`
      mutation UpdateCart($documentId: ID!, $data: CartInput!) {
        updateCart(documentId: $documentId, data: $data) {
          documentId
          product {
            documentId
            name
            model
            odoo_product_id
            price_lists {
              price
              sale_price
              min_quantity
              max_quantity
              user_level
            }
            inventories {
              documentId
              name
              location_code
              quantity
            }
            images {
              url
              alternativeText
              width
              height
            }
          }
          user {
            documentId
            username
          }
          quantity
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
    updateQuantity: graphql(`
      mutation UpdateQuantity($documentId: ID!, $data: CartInput!) {
        updateCart(documentId: $documentId, data: $data) {
          documentId
        }
      }
    `),
  },
};

export default schema;
