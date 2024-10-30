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
    "\n      query UsersPermissionsUsers {\n        usersPermissionsUsers {\n          documentId\n          username\n          email\n          provider\n          confirmed\n          blocked\n          account_status\n          account_details {\n            documentId\n            level\n            user_type\n            odoo_id\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n            createdAt\n            updatedAt\n            publishedAt\n            locale\n            user {\n              documentId\n              username\n              email\n              provider\n              confirmed\n              blocked\n              createdAt\n              updatedAt\n              publishedAt\n              locale\n            }\n          }\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n        }\n      }\n    ": types.UsersPermissionsUsersDocument,
    "\n      query UsersPermissionsUser($documentId: ID!) {\n        usersPermissionsUser(documentId: $documentId) {\n          email\n          provider\n          confirmed\n          blocked\n          documentId\n          account_status\n          account_details {\n            documentId\n            level\n            user_type\n            odoo_id\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    ": types.UsersPermissionsUserDocument,
    "\n      mutation RegisterUser($data: RegisterUserInput!) {\n        registerUser(data: $data) {\n          error\n          data {\n            documentId\n            username\n            email\n          }\n          success\n          statusText\n        }\n      }\n    ": types.RegisterUserDocument,
    "\n      mutation Login($input: UsersPermissionsLoginInput!) {\n        login(input: $input) {\n          jwt\n          user {\n            id\n            email\n            blocked\n            username\n            confirmed\n            role {\n              id\n              name\n              description\n              type\n            }\n          }\n        }\n      }\n    ": types.LoginDocument,
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
export function graphql(source: "\n      query UsersPermissionsUsers {\n        usersPermissionsUsers {\n          documentId\n          username\n          email\n          provider\n          confirmed\n          blocked\n          account_status\n          account_details {\n            documentId\n            level\n            user_type\n            odoo_id\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n            createdAt\n            updatedAt\n            publishedAt\n            locale\n            user {\n              documentId\n              username\n              email\n              provider\n              confirmed\n              blocked\n              createdAt\n              updatedAt\n              publishedAt\n              locale\n            }\n          }\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n        }\n      }\n    "): (typeof documents)["\n      query UsersPermissionsUsers {\n        usersPermissionsUsers {\n          documentId\n          username\n          email\n          provider\n          confirmed\n          blocked\n          account_status\n          account_details {\n            documentId\n            level\n            user_type\n            odoo_id\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n            createdAt\n            updatedAt\n            publishedAt\n            locale\n            user {\n              documentId\n              username\n              email\n              provider\n              confirmed\n              blocked\n              createdAt\n              updatedAt\n              publishedAt\n              locale\n            }\n          }\n          createdAt\n          updatedAt\n          publishedAt\n          locale\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query UsersPermissionsUser($documentId: ID!) {\n        usersPermissionsUser(documentId: $documentId) {\n          email\n          provider\n          confirmed\n          blocked\n          documentId\n          account_status\n          account_details {\n            documentId\n            level\n            user_type\n            odoo_id\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    "): (typeof documents)["\n      query UsersPermissionsUser($documentId: ID!) {\n        usersPermissionsUser(documentId: $documentId) {\n          email\n          provider\n          confirmed\n          blocked\n          documentId\n          account_status\n          account_details {\n            documentId\n            level\n            user_type\n            odoo_id\n            first_name\n            middle_name\n            last_name\n            business_name\n            position\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RegisterUser($data: RegisterUserInput!) {\n        registerUser(data: $data) {\n          error\n          data {\n            documentId\n            username\n            email\n          }\n          success\n          statusText\n        }\n      }\n    "): (typeof documents)["\n      mutation RegisterUser($data: RegisterUserInput!) {\n        registerUser(data: $data) {\n          error\n          data {\n            documentId\n            username\n            email\n          }\n          success\n          statusText\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation Login($input: UsersPermissionsLoginInput!) {\n        login(input: $input) {\n          jwt\n          user {\n            id\n            email\n            blocked\n            username\n            confirmed\n            role {\n              id\n              name\n              description\n              type\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation Login($input: UsersPermissionsLoginInput!) {\n        login(input: $input) {\n          jwt\n          user {\n            id\n            email\n            blocked\n            username\n            confirmed\n            role {\n              id\n              name\n              description\n              type\n            }\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;