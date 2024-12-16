import { graphql } from '@/lib/gql';

export const schema = {
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

export default schema;