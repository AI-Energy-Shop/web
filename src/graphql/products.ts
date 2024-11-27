import { graphql } from '@/lib/gql';

export const PRODUCT_OPERATIONS = {
  Query: {
    products: graphql(`
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
    product: graphql(`
      query Product($documentId: ID!) {
        product(documentId: $documentId) {
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
  },
  Mutation: {
    createProduct: graphql(`
      mutation CreateProduct($data: ProductInput!) {
        createProduct(data: $data) {
          documentId
          name
          description
          category
          vendor
          item_code
          price_lists {
            documentId
            createdAt
            publishedAt
            updatedAt
          }
        }
      }
    `),
    updateProduct: graphql(`
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
          price_lists {
            documentId
          }
        }
      }
    `),
    createProductPriceList: graphql(`
      mutation CreatePriceList($data: PriceListInput!) {
        createPriceList(data: $data) {
          documentId
        }
      }
    `),
    updateProductPriceList: graphql(`
      mutation UpdatePriceList($data: PriceListInput!, $documentId: ID!) {
        updatePriceList(data: $data, documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};
