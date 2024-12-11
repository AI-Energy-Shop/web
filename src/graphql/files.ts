import { graphql } from '@/lib/gql';

export const FILES_OPERATIONS = {
  Query: {
    files: graphql(`
      query Files($filters: FilesFiltersArgs) {
        files(filters: $filters) {
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
        }
      }
    `),
  },
  Mutation: {},
};
