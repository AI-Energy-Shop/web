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
          item_code
          createdAt
          updatedAt
          publishedAt
          locale
        }
      }
    `),
    product: gql(`
      query Product($documentId: ID!) {
        product(documentId: $documentId){
          documentId
          name
          description
          category
          vendor
          item_code
          createdAt
          updatedAt
          publishedAt
          locale
          price_list {
            documentId
            prices {
              location
              price
              min_quantity
              max_quantity
              user_level
            }
          }
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
          item_code
          price_list {
            documentId
            prices {
              id
              price
              min_quantity
              max_quantity
              location
              user_level
            }
            createdAt
            publishedAt
            updatedAt
          }
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
          item_code
          createdAt
          updatedAt
          price_list {
            documentId
            prices {
              id
              price
              min_quantity
              max_quantity
              location
              user_level
            }
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
