/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n      query Pages {\n        pages {\n          documentId\n          title\n          slug\n        }\n      }\n    ':
    types.PagesDocument,
  '\n      query GetPage($slug: String!) {\n        getPage(slug: $slug) {\n          documentId\n          title\n          slug\n          sections {\n            ... on ComponentSectionsWarehouseLocations {\n              id\n              heading\n              sub_heading\n              locations {\n                id\n                address\n                warehouse_time\n                office_time\n                google_maps_link\n                name\n              }\n            }\n            ... on ComponentSectionsContactUs {\n              id\n              heading\n              description\n              button_title\n              background_image {\n                name\n                alternativeText\n                url\n              }\n            }\n            ... on ComponentSectionsContactDetails {\n              id\n              left_heading\n              left_sub_heading\n              right_heading\n              right_sub_heading\n            }\n            ... on ComponentSectionsAbout {\n              id\n              heading\n              sub_heading\n              description\n              button_title\n              background_image {\n                name\n                alternativeText\n                url\n              }\n            }\n            ... on ComponentSectionsImageSlider {\n              id\n              animation_duration\n              display_button\n              slides {\n                id\n                title\n                description\n                link\n                image {\n                  name\n                  alternativeText\n                  url\n                }\n                type\n              }\n            }\n            ... on ComponentFormNewsletter {\n              id\n              heading\n              sub_heading\n              inputs {\n                id\n                label\n                type\n                placeholder\n                required\n              }\n              sub_text\n              button_title\n              image {\n                name\n                alternativeText\n                url\n              }\n            }\n            ... on ComponentFormInquiry {\n              id\n              heading\n              button_title\n              inputs {\n                id\n                label\n                type\n                placeholder\n                required\n              }\n            }\n            ... on Error {\n              code\n              message\n            }\n          }\n          createdAt\n          updatedAt\n          publishedAt\n        }\n      }\n    ':
    types.GetPageDocument,
  '\n      query Products {\n        products {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n        }\n      }\n    ':
    types.ProductsDocument,
  '\n      query Product($documentId: ID!) {\n        product(documentId: $documentId) {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n          odoo_product_id\n          price_list {\n            id\n            price\n            sale_price\n            min_quantity\n            max_quantity\n            user_level\n          }\n          inventory {\n            id\n            location\n            quantity\n          }\n          images {\n            documentId\n            name\n            alternativeText\n            caption\n            url\n          }\n          specification {\n            key\n            value\n            id\n          }\n        }\n      }\n    ':
    types.ProductDocument,
  '\n      mutation CreateProduct($data: ProductInput!) {\n        createProduct(data: $data) {\n          documentId\n          name\n          description\n          category\n          vendor\n        }\n      }\n    ':
    types.CreateProductDocument,
  '\n      mutation UpdateProduct($documentId: ID!, $data: ProductInput!) {\n        updateProduct(documentId: $documentId, data: $data) {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n        }\n      }\n    ':
    types.UpdateProductDocument,
  '\n      query UsersPermissionsUsers {\n        usersPermissionsUsers {\n          documentId\n          username\n          email\n          provider\n          blocked\n          account_status\n          account_detail {\n            documentId\n            level\n            user_type\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    ':
    types.UsersPermissionsUsersDocument,
  '\n      query UsersPermissionsUser($documentId: ID!) {\n        usersPermissionsUser(documentId: $documentId) {\n          documentId\n          username\n          email\n          provider\n          blocked\n          account_status\n          account_detail {\n            documentId\n            level\n            user_type\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    ':
    types.UsersPermissionsUserDocument,
  '\n      mutation RegisterUser($data: RegisterUserInput!) {\n        registerUser(data: $data) {\n          error\n          success\n          statusText\n        }\n      }\n    ':
    types.RegisterUserDocument,
  '\n      mutation Login($input: UsersPermissionsLoginInput!) {\n        login(input: $input) {\n          jwt\n          user {\n            id\n            username\n            email\n            confirmed\n            blocked\n          }\n        }\n      }\n    ':
    types.LoginDocument,
  '\n      mutation UserApproval($data: UserApprovalRequestInputArgs!) {\n        userApproval(data: $data) {\n          error\n          success\n          statusText\n        }\n      }\n    ':
    types.UserApprovalDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query Files($filters: FilesFiltersArgs) {\n        files(filters: $filters) {\n          documentId\n          name\n          alternativeText\n          caption\n          width\n          height\n          formats\n          hash\n          ext\n          mime\n          size\n          url\n          previewUrl\n          provider\n          provider_metadata\n        }\n      }\n    '
): (typeof documents)['\n      query Files($filters: FilesFiltersArgs) {\n        files(filters: $filters) {\n          documentId\n          name\n          alternativeText\n          caption\n          width\n          height\n          formats\n          hash\n          ext\n          mime\n          size\n          url\n          previewUrl\n          provider\n          provider_metadata\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query Pages {\n        pages {\n          documentId\n          title\n          slug\n        }\n      }\n    '
): (typeof documents)['\n      query Pages {\n        pages {\n          documentId\n          title\n          slug\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query Products {\n        products {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n        }\n      }\n    '
): (typeof documents)['\n      query Products {\n        products {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query Product($documentId: ID!) {\n        product(documentId: $documentId) {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n          odoo_product_id\n          price_list {\n            id\n            price\n            sale_price\n            min_quantity\n            max_quantity\n            user_level\n          }\n          inventory {\n            id\n            location\n            quantity\n          }\n          images {\n            documentId\n            name\n            alternativeText\n            caption\n            url\n          }\n          specification {\n            key\n            value\n            id\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query Product($documentId: ID!) {\n        product(documentId: $documentId) {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n          odoo_product_id\n          price_list {\n            id\n            price\n            sale_price\n            min_quantity\n            max_quantity\n            user_level\n          }\n          inventory {\n            id\n            location\n            quantity\n          }\n          images {\n            documentId\n            name\n            alternativeText\n            caption\n            url\n          }\n          specification {\n            key\n            value\n            id\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation CreateProduct($data: ProductInput!) {\n        createProduct(data: $data) {\n          documentId\n          name\n          description\n          category\n          vendor\n        }\n      }\n    '
): (typeof documents)['\n      mutation CreateProduct($data: ProductInput!) {\n        createProduct(data: $data) {\n          documentId\n          name\n          description\n          category\n          vendor\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation UpdateProduct($documentId: ID!, $data: ProductInput!) {\n        updateProduct(documentId: $documentId, data: $data) {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n        }\n      }\n    '
): (typeof documents)['\n      mutation UpdateProduct($documentId: ID!, $data: ProductInput!) {\n        updateProduct(documentId: $documentId, data: $data) {\n          documentId\n          name\n          description\n          category\n          vendor\n          createdAt\n          updatedAt\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query UsersPermissionsUsers {\n        usersPermissionsUsers {\n          documentId\n          username\n          email\n          provider\n          blocked\n          account_status\n          account_detail {\n            documentId\n            level\n            user_type\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query UsersPermissionsUsers {\n        usersPermissionsUsers {\n          documentId\n          username\n          email\n          provider\n          blocked\n          account_status\n          account_detail {\n            documentId\n            level\n            user_type\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query UsersPermissionsUser($documentId: ID!) {\n        usersPermissionsUser(documentId: $documentId) {\n          documentId\n          username\n          email\n          provider\n          blocked\n          account_status\n          account_detail {\n            documentId\n            level\n            user_type\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query UsersPermissionsUser($documentId: ID!) {\n        usersPermissionsUser(documentId: $documentId) {\n          documentId\n          username\n          email\n          provider\n          blocked\n          account_status\n          account_detail {\n            documentId\n            level\n            user_type\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation Login($input: UsersPermissionsLoginInput!) {\n        login(input: $input) {\n          jwt\n          user {\n            id\n            username\n            email\n            confirmed\n            blocked\n          }\n        }\n      }\n    '
): (typeof documents)['\n      mutation Login($input: UsersPermissionsLoginInput!) {\n        login(input: $input) {\n          jwt\n          user {\n            id\n            username\n            email\n            confirmed\n            blocked\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      mutation UserApproval($data: UserApprovalRequestInputArgs!) {\n        userApproval(data: $data) {\n          error\n          success\n          statusText\n        }\n      }\n    '
): (typeof documents)['\n      mutation UserApproval($data: UserApprovalRequestInputArgs!) {\n        userApproval(data: $data) {\n          error\n          success\n          statusText\n        }\n      }\n    '];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
