import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

const schema = {
  Query: {
    storeProduct: graphql(`
      query GetStoreProduct($handle: String!) {
        getStoreProduct(handle: $handle) {
          documentId
          name
          model
          description
          handle
          odoo_product_id
          odoo_product_name
          files {
            documentId
            mime
            name
            url
            alternativeText
          }
          images {
            documentId
            name
            alternativeText
            caption
            width
            height
            formats
            hash
            ext
            mime
            size
            url
            previewUrl
            provider
            provider_metadata
            createdAt
            updatedAt
            publishedAt
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
              mime
              url
            }
          }
          inventory {
            documentId
            melbourne
            sydney
            brisbane
          }
          shipping {
            documentId
            width
            height
            weight
            length
          }
          tags {
            documentId
            tag
          }
          collections {
            documentId
            title
          }
          price_lists {
            documentId
            price
            comparePrice
            min_quantity
            max_quantity
            user_level
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
          maxQuantity
          createdAt
          updatedAt
          releasedAt
        }
      }
    `),
    storeProducts: graphql(`
      query GetStoreProducts(
        $filters: ProductFiltersInput
        $pagination: PaginationArg
        $sort: [String]
      ) {
        products(filters: $filters, pagination: $pagination, sort: $sort) {
          documentId
          name
          description
          handle
          product_type
          model
          odoo_product_id
          odoo_product_name
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
          collections {
            documentId
            title
          }
          price_lists {
            documentId
            price
            comparePrice
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
          inventory {
            documentId
            melbourne
            sydney
            brisbane
          }
          shipping {
            documentId
            height
            width
            length
            weight
          }
          maxQuantity
          madeBy {
            email
          }
          improvedBy {
            email
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
          handle
          product_type
          model
          odoo_product_id
          odoo_product_name
          categories {
            title
            slug
            image {
              documentId
              name
              alternativeText
              caption
              width
              height
              formats
              hash
              ext
              mime
              size
              url
              previewUrl
              provider
              provider_metadata
              createdAt
              updatedAt
              publishedAt
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
              caption
              width
              height
              formats
              hash
              ext
              mime
              size
              url
              previewUrl
              provider
              provider_metadata
              createdAt
              updatedAt
              publishedAt
            }
          }
          collections {
            documentId
            title
          }
          tags {
            documentId
            tag
          }
          price_lists {
            documentId
            price
            comparePrice
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
          inventory {
            documentId
            melbourne
            sydney
            brisbane
          }
          shipping {
            documentId
            height
            width
            length
            weight
          }
          maxQuantity
          madeBy {
            email
          }
          improvedBy {
            email
          }
          createdAt
          updatedAt
          releasedAt
        }
      }
    `),
    products: graphql(`
      query Products(
        $filters: ProductFiltersInput
        $pagination: PaginationArg
        $sort: [String]
      ) {
        products(filters: $filters, pagination: $pagination, sort: $sort) {
          documentId
          name
          description
          handle
          product_type
          model
          odoo_product_id
          odoo_product_name
          categories {
            title
            slug
            image {
              documentId
              name
              alternativeText
              caption
              width
              height
              formats
              hash
              ext
              mime
              size
              url
              previewUrl
              provider
              provider_metadata
              createdAt
              updatedAt
              publishedAt
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
              caption
              width
              height
              formats
              hash
              ext
              mime
              size
              url
              previewUrl
              provider
              provider_metadata
              createdAt
              updatedAt
              publishedAt
            }
          }
          collections {
            documentId
            title
          }
          tags {
            documentId
            tag
          }
          price_lists {
            documentId
            price
            comparePrice
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
          inventory {
            documentId
            melbourne
            sydney
            brisbane
          }
          shipping {
            documentId
            height
            width
            length
            weight
          }
          maxQuantity
          madeBy {
            email
          }
          improvedBy {
            email
          }
          createdAt
          updatedAt
          releasedAt
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
        }
      }
    `),
    tags: gql(`
      query Tags {
        tags {
          documentId
          tag
        }
      }
    `),
  },
  Mutation: {
    customProductCreate: graphql(`
      mutation CustomProductCreate($data: ProductInput!) {
        customProductCreate(data: $data) {
          documentId
          name
          model
          description
          handle
          odoo_product_id
          odoo_product_name
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
          collections {
            documentId
            title
          }
          inventory {
            documentId
            melbourne
            sydney
            brisbane
          }
          price_lists {
            documentId
            price
            comparePrice
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
          maxQuantity
          createdAt
          updatedAt
          releasedAt
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
          handle
          odoo_product_id
          odoo_product_name
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
          collections {
            documentId
            title
          }
          inventory {
            documentId
            melbourne
            sydney
            brisbane
          }
          price_lists {
            documentId
            price
            comparePrice
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
          maxQuantity
          improvedBy {
            email
          }
          madeBy {
            email
          }
          createdAt
          updatedAt
          releasedAt
        }
      }
    `),
    deleteProduct: graphql(`
      mutation DeleteProduct($documentId: ID!) {
        deleteProduct(documentId: $documentId) {
          documentId
        }
      }
    `),
    createPrice: graphql(`
      mutation CreatePrice($data: PriceInput!) {
        createPrice(data: $data) {
          documentId
          comparePrice
          price
          min_quantity
          max_quantity
          user_level
          createdAt
          updatedAt
        }
      }
    `),
    updatePrice: graphql(`
      mutation UpdatePrice($documentId: ID!, $data: PriceInput!) {
        updatePrice(documentId: $documentId, data: $data) {
          documentId
          comparePrice
          price
          min_quantity
          max_quantity
          user_level
          createdAt
          updatedAt
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
          melbourne
          sydney
          brisbane
          createdAt
          updatedAt
        }
      }
    `),
    updateInventory: graphql(`
      mutation UpdateInventory($documentId: ID!, $data: InventoryInput!) {
        updateInventory(documentId: $documentId, data: $data) {
          documentId
          melbourne
          sydney
          brisbane
          createdAt
          updatedAt
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
    createShipping: graphql(`
      mutation CreateShipping($data: ShippingInput!) {
        createShipping(data: $data) {
          documentId
          width
          height
          weight
          length
          createdAt
          updatedAt
        }
      }
    `),
    updateShipping: graphql(`
      mutation UpdateShipping($documentId: ID!, $data: ShippingInput!) {
        updateShipping(documentId: $documentId, data: $data) {
          documentId
          width
          height
          weight
          length
          createdAt
          updatedAt
        }
      }
    `),
    deleteShipping: graphql(`
      mutation DeleteShipping($documentId: ID!) {
        deleteShipping(documentId: $documentId) {
          documentId
        }
      }
    `),
  },
};

export default schema;
