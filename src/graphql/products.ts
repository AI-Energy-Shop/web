import { gql } from '@apollo/client';

export const PRODUCT_OPERATIONS = {
  Query: {
    products: gql(`
     query Products {
        products {
          documentId
          name
          description
          category
          vendor
          odoo_product_id
          createdAt
          updatedAt
          publishedAt
          locale
          price_list {
            price
            min_quantity
            max_quantity
            user_level
          }
          inventory {
            location
            quantity
          }
        }
      }
    `),
    product: gql(`
      query Product($documentId: ID!) {
        product(documentId: $documentId) {
          documentId
          name
          description
          vendor
          category
          odoo_product_id
          price_list {
            price
            min_quantity
            max_quantity
            user_level
          }
          inventory {
            location
            quantity
          }
          createdAt
        }
      }
    `),
  },
  Mutation: {
    createProduct: gql(`
      mutation CreateProduct($data: ProductInput!) {
        createProduct(data: $data) {
          documentId
          name
          description
          category
          vendor
          odoo_product_id
          inventory {
            location
            quantity
          }
          price_list {
            id
            price
            min_quantity
            max_quantity
            user_level
          }
          createdAt
        }
      }
    `),
    updateProduct: gql(`
      mutation UpdateProduct($documentId: ID!, $data: ProductInput!) {
        updateProduct(documentId: $documentId, data: $data) {
          documentId
          name
          description
          category
          vendor
          createdAt
          updatedAt
          odoo_product_id
          inventory {
            id
            location
            quantity
          }
          price_list {
            id
            price
            min_quantity
            max_quantity
            user_level
          }
        }
      }
    `),
    createProductPriceList: gql(`
      mutation CreatePriceList($data: PriceListInput!) {
        createPriceList(data: $data) {
          documentId
        }
      }
    `),
    updateProductPriceList: gql(`
      mutation UpdatePriceList($data: PriceListInput!, $documentId: ID!) {
        updatePriceList(data: $data, documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};
