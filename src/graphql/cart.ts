import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

const schema = {
  Query: {
    carts: gql(`
      #graphql
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
    checkoutUserData: graphql(`
      query GetCheckoutUserData($documentId: ID!) {
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
          addresses {
            documentId
            street1
            street2
            state
            city
            zip_code
            country
            phone
            isActive
            title
            odoo_address_id
            mobile
            createdAt
            updatedAt
          }
        }
      }
    `),
  },
  Mutation: {
    createCart: gql(`
      #graphql
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
      #graphql
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
    deleteCart: gql(`
      #graphql
      mutation DeleteCart($documentId: ID!) {
        deleteCart(documentId: $documentId) {
          documentId
        }
      }
    `),
    updateQuantity: gql(`
      #graphql
      mutation UpdateQuantity($documentId: ID!, $data: CartInput!) {
        updateCart(documentId: $documentId, data: $data) {
          documentId
        }
      }
    `),
  },
};

export default schema;
