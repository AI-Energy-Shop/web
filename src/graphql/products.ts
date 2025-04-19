import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

const schema = {
  Query: {
    products: graphql(`
      query Products($filters: ProductFiltersInput, $pagination: PaginationArg) {
        products(filters: $filters, pagination: $pagination) {
          documentId
          name
          description
          product_type
          vendor
          model
          odoo_product_id
          categories {
            title
            slug
            image {
              documentId
              name
              alternativeText
              width
              height
              mime
              url
            }
          }
          brand {
            documentId
            name
            url
            image {
              documentId
              name
              alternativeText
              width
              height
              mime
              url
            }
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
          specifications {
            documentId
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
          vendor
          product_type
          model
          odoo_product_id
          categories {
            title
            slug
            image {
              documentId
              name
              alternativeText
              width
              height
              mime
              url
            }
          }
          brand {
            documentId
            name
            url
            image {
              documentId
              name
              alternativeText
              width
              height
              mime
              url
            }
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
          specifications {
            documentId
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
    brands: gql(`
      query Brands($filters: BrandFiltersInput) {
        brands(filters: $filters) {
          documentId
          name
          url
          image {
            name
            alternativeText
            mime
            url
            width
            height
          }
          products {
            documentId
            name
            brand {
              name
            }
          }
        }
      }
    `),
    categories: gql(`
      query Categories {
        categories {
          documentId
          title
          slug
          image {
            name
            alternativeText
            mime
            url
            width
            height
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
          model
          description
          vendor
          odoo_product_id
          brand {
            name
            url
            image {
              documentId
              name
              alternativeText
              width
              height
              mime
              url
            }
          }
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
          specifications {
            documentId
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
          vendor
          odoo_product_id
          categories {
            title
            slug
            image {
              name
              alternativeText
              mime
              url
              width
              height
            }
          }
          brand {
            name
            url
            image {
              documentId
              name
              alternativeText
              width
              height
            }
          }
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
          specifications {
            documentId
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
