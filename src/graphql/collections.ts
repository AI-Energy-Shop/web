import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

const schema = {
  Query: {
    collections: graphql(`
      query Collections($filters: CollectionFiltersInput) {
        collections(filters: $filters) {
          documentId
          title
          handle
          sortOrder
          productCount
          image {
            name
            alternativeText
            url
          }
        }
      }
    `),
    collectionsWithProducts: gql(`
      query CollectionsWithProducts(
        $collectionsFilters: CollectionFiltersInput, 
        $productsFilters: ProductFiltersInput, 
        $productsPagination: PaginationArg
      ) {
        collections(filters: $collectionsFilters) {
          documentId
          handle
          sortOrder
          productCount
          image {
            name
            alternativeText
            url
          }
          productFilters {
            id
            title
            handle
          }
          products(
            filters: $productsFilters,
            pagination: $productsPagination,
          ) {
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
              createdAt
              updatedAt
              releasedAt
            }
          }
        }
    `),
  },
  Mutation: {},
};

export default schema;
