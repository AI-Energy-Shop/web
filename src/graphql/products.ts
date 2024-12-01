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
          createdAt
          updatedAt
          publishedAt
          locale
          odoo_product_id
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
          createdAt
          updatedAt
        }
      }
    `),
    createProductPriceList: graphql(`
      mutation CreatePriceList($data: ProductInput!) {
        createPriceList(data: $data) {
          documentId
        }
      }
    `),
    updateProductPriceList: graphql(`
      mutation UpdatePriceList($data: ProductInput!, $documentId: ID!) {
        updatePriceList(data: $data, documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};
