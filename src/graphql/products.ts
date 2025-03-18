import { graphql } from '@/lib/gql';

const schema = {
  Query: {
    products: graphql(`
      query Products(
        $filters: ProductFiltersInput
        $pagination: PaginationArg
      ) {
        products(filters: $filters, pagination: $pagination) {
          documentId
          name
          description
          category
          vendor
          model
          odoo_product_id
          product_brand_image {
            documentId
            name
            alternativeText
            width
            height
            mime
            url
          }
          price_lists {
            documentId
            price
            sale_price
            min_quantity
            max_quantity
            user_level
          }
          files {
            documentId
            name
            alternativeText
            width
            height
            mime
            url
          }
          images {
            documentId
            name
            alternativeText
            width
            height
            mime
            url
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
          inventories {
            documentId
            name
            location_code
            quantity
            createdAt
            updatedAt
            publishedAt
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
          model
          odoo_product_id
          product_brand_image {
            documentId
            name
            alternativeText
            width
            height
            mime
            url
          }
          price_lists {
            documentId
            price
            sale_price
            min_quantity
            max_quantity
            user_level
          }
          files {
            documentId
            name
            alternativeText
            width
            height
            mime
            url
          }
          images {
            documentId
            name
            alternativeText
            width
            height
            mime
            url
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
          inventories {
            documentId
            name
            location_code
            quantity
            createdAt
            updatedAt
            publishedAt
          }
          createdAt
          updatedAt
          publishedAt
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
          model
          description
          category
          vendor
          odoo_product_id
          inventories {
            location_code
            quantity
          }
          price_lists {
            documentId
            price
            sale_price
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
          model
          description
          category
          vendor
          odoo_product_id
          price_lists {
            documentId
            price
            sale_price
            min_quantity
            max_quantity
            user_level
          }
          inventories {
            documentId
            location_code
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
