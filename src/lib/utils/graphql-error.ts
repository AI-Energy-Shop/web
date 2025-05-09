import { ApolloError } from '@apollo/client';

interface ErrorDetailItem {
  path?: (string | number)[];
  message: string;
  name?: string;
  value?: string;
  [key: string]: any;
}

interface ErrorDetails {
  errors: ErrorDetailItem[];
}

interface ErrorDetail {
  name: string;
  message: string;
  details?: ErrorDetails;
}

export interface GraphQLErrorResponse {
  message: string;
  code?: string;
  path?: string[];
  details?: ErrorDetails;
  name?: string;
}

export class GraphQLException extends Error {
  public code?: string;
  public path?: string[];
  public details?: ErrorDetails;
  public name: string;

  constructor(error: GraphQLErrorResponse) {
    super(error.message);
    this.name = error.name || 'GraphQLException';
    this.code = error.code;
    this.path = error.path;
    this.details = error.details;
  }
}

export const handleGraphQLError = (
  error: ApolloError | Error
): GraphQLException => {
  if (error instanceof ApolloError) {
    const graphqlError = error.graphQLErrors[0];
    if (graphqlError) {
      const errorDetails = graphqlError.extensions?.error as ErrorDetail;

      return new GraphQLException({
        message: errorDetails?.message || graphqlError.message,
        code: graphqlError.extensions?.code as string,
        path: graphqlError.path as string[],
        details: errorDetails?.details,
        name: errorDetails?.name || 'GraphQLException',
      });
    }
  }
  return new GraphQLException({
    message: error.message || 'An unexpected error occurred',
    name: 'GraphQLException',
  });
};

export const isGraphQLError = (error: any): error is GraphQLException => {
  return error instanceof GraphQLException;
};

export const formatGraphQLError = (error: GraphQLException): string => {
  let message = error.message;

  if (error.code) {
    message = `[${error.code}] ${message}`;
  }

  if (error.path?.length) {
    message = `${message} (at ${error.path.join('.')})`;
  }

  if (error.details?.errors) {
    const detailMessages = error.details.errors
      .map((err) => {
        let msg = err.message;
        if (err.name) msg = `[${err.name}] ${msg}`;
        if (err.value) msg = `${msg} (value: ${err.value})`;
        if (err.path) msg = `${msg} (path: ${err.path.join('.')})`;
        return msg;
      })
      .join('; ');
    if (detailMessages) {
      message = `${message} - ${detailMessages}`;
    }
  }

  return message;
};
