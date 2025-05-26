import { graphql } from '@/lib/gql';
import { gql } from '@apollo/client';

export const schema = {
  Query: {
    files: gql(`
      query Files($filters: UploadFileFiltersInput) {
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
    uploadFiles: gql(`
      query UploadFiles($filters: UploadFileFiltersInput) {
        uploadFiles(filters: $filters) {
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
