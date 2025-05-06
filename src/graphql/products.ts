import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

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
            documentId
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
          shipping {
            height
            width
            length
            weight
          }
          createdAt
          updatedAt
          releasedAt
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
            documentId
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
          shipping {
            height
            width
            length
            weight
          }
          createdAt
          updatedAt
          releasedAt
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
    specifications: graphql(`
      query Specifications {
        specifications {
          documentId
          key
          value
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
            documentId
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
            documentId
            feature
          }
          shipping {
            documentId
            width
            height
            weight
            length
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    updateProduct: graphql(`
      mutation customProductUpdate($documentId: ID!, $data: ProductInput!) {
        customProductUpdate(documentId: $documentId, data: $data) {
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
            documentId
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
            documentId
            feature
          }
          shipping {
            documentId
            width
            height
            weight
            length
          }
          createdAt
          updatedAt
          releasedAt
          # status
          improvedBy {
            email
          }
          madeBy {
            email
          }
        }
      }
    `),
    createPrice: graphql(`
      mutation CreatePrice($data: PriceInput!) {
        createPrice(data: $data) {
          documentId
          sale_price
          price
          min_quantity
          max_quantity
          user_level
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    updatePrice: graphql(`
      mutation UpdatePrice($documentId: ID!, $data: PriceInput!) {
        updatePrice(documentId: $documentId, data: $data) {
          documentId
          sale_price
          price
          min_quantity
          max_quantity
          user_level
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    deletePrice: graphql(`
      mutation DeletePrice($documentId: ID!) {
        deletePrice(documentId: $documentId) {
          documentId
        }
      }
    `),
    createInventory: graphql(`
      mutation CreateInventory($data: InventoryInput!) {
        createInventory(data: $data) {
          documentId
          name
          location_code
          quantity
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    updateInventory: graphql(`
      mutation UpdateInventory($documentId: ID!, $data: InventoryInput!) {
        updateInventory(documentId: $documentId, data: $data) {
          documentId
          name
          location_code
          quantity
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    deleteInventory: graphql(`
      mutation DeleteInventory($documentId: ID!) {
        deleteInventory(documentId: $documentId) {
          documentId
        }
      }
    `),
    createSpecification: graphql(`
      mutation CreateSpecification($data: SpecificationInput!) {
        createSpecification(data: $data) {
          documentId
          key
          value
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    updateSpecification: graphql(`
      mutation UpdateSpecification(
        $documentId: ID!
        $data: SpecificationInput!
      ) {
        updateSpecification(documentId: $documentId, data: $data) {
          documentId
          key
          value
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    deleteSpecification: graphql(`
      mutation DeleteSpecification($documentId: ID!) {
        deleteSpecification(documentId: $documentId) {
          documentId
        }
      }
    `),
    createKeyFeature: graphql(`
      mutation CreateKeyFeature($data: KeyFeatureInput!) {
        createKeyFeature(data: $data) {
          documentId
          feature
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    updateKeyFeature: graphql(`
      mutation UpdateKeyFeature($documentId: ID!, $data: KeyFeatureInput!) {
        updateKeyFeature(documentId: $documentId, data: $data) {
          documentId
          feature
          createdAt
          updatedAt
          publishedAt
        }
      }
    `),
    deleteKeyFeature: graphql(`
      mutation DeleteKeyFeature($documentId: ID!) {
        deleteKeyFeature(documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};

export default schema;
