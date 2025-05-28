import { gql } from '@apollo/client';

export const schema = {
  Query: {
    file: gql(`
      query UploadFile($documentId: ID!) {
        uploadFile(documentId: $documentId) {
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
    `),
    files: gql(`
      query Files($filters: UploadFileFiltersInput, $sort: [String]) {
        files(filters: $filters, sort: $sort) {
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
          createdAt
          updatedAt
          publishedAt
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
