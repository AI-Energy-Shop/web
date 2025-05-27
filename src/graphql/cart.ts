import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

const schema = {
  Query: {
    carts: graphql(`
      query Carts($filters: CartFiltersInput, $pagination: PaginationArg) {
        carts(filters: $filters, pagination: $pagination) {
          documentId
          product {
            documentId
            name
            model
            odoo_product_id
            odoo_product_name
            price_lists {
              price
              comparePrice
              min_quantity
              max_quantity
              user_level
            }
            inventory {
              documentId
              melbourne
              sydney
              brisbane
              createdAt
              updatedAt
            }
            images {
              url
              alternativeText
              width
              height
            }
            shipping {
              weight
              height
              width
              length
              documentId
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
              inventory {
                documentId
                melbourne
                sydney
                brisbane
                createdAt
                updatedAt
              }
              shipping {
                height
                length
                weight
                width
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
          creditCards {
            brand
            documentId
            expMonth
            expYear
            isDefault
            last4Char
            publishedAt
            stripePaymentMethodID
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
            odoo_product_name
            name
            model
            price_lists {
              price
              comparePrice
              min_quantity
              max_quantity
              user_level
            }
            inventory {
              documentId
              melbourne
              sydney
              brisbane
              createdAt
              updatedAt
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
    updateCart: graphql(`
      #graphql
      mutation UpdateCart($documentId: ID!, $data: CartInput!) {
        updateCart(documentId: $documentId, data: $data) {
          documentId
          product {
            documentId
            name
            model
            odoo_product_id
            odoo_product_name
            price_lists {
              price
              comparePrice
              min_quantity
              max_quantity
              user_level
            }
            inventory {
              documentId
              melbourne
              sydney
              brisbane
              createdAt
              updatedAt
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
