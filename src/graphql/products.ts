import { graphql } from '@/lib/gql';

const schema = {
  Query: {
    products: graphql(`
      query Products {
        products {
          name
          description
          category
          vendor
          documentId
          odoo_product_id
          price_list {
            id
            price
            min_quantity
            max_quantity
            user_level
          }
          inventory {
            id
            location
            quantity
          }
          specification {
            id
            key
            value
          }
          files {
            documentId
            mime
            name
            url
            alternativeText
          }
          images {
            documentId
            mime
            name
            url
            alternativeText
          }
          createdAt
          updatedAt
          publishedAt
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
          price_list {
            id
            price
            sale_price
            min_quantity
            max_quantity
            user_level
          }
          inventory {
            id
            location
            quantity
          }
          images {
            documentId
            name
            alternativeText
            caption
            url
          }
          specification {
            key
            value
            id
          }
          key_features {
            id
            feature
          }
          files {
            documentId
            name
            url
          }
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
          files {
            documentId
            mime
            name
            url
            alternativeText
          }
          images {
            documentId
            mime
            name
            url
            alternativeText
          }
          specification {
            id
            key
            value
          }
          key_features {
            id
            feature
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    updateProduct: graphql(`
      mutation CustomProductUpdate($documentId: ID!, $data: ProductInput!) {
        customProductUpdate(documentId: $documentId, data: $data) {
          documentId
          name
          description
          category
          vendor
          odoo_product_id
          price_list {
            id
            price
            sale_price
            min_quantity
            max_quantity
            user_level
          }
          inventory {
            id
            location
            quantity
          }
          specification {
            id
            key
            value
          }
          files {
            documentId
            name
            url
            mime
            ext
          }
          images {
            documentId
            name
            url
            mime
            ext
          }
          key_features {
            id
            feature
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
  },
};

export default schema;
