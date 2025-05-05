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
              createdAt
              updatedAt
              publishedAt
            }
          }
        }
    `),
  },
  Mutation: {},
};

export default schema;
