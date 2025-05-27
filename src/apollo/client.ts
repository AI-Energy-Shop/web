import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

const PROTOCOL = process.env.NEXT_PUBLIC_BASE_PROTOCOL || 'http';
const HOST = process.env.NEXT_PUBLIC_BASE_URL_HOST || 'localhost:1337';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: `${PROTOCOL}://${HOST}/graphql`,
  });

  // Since we're using cookies, we just need to ensure they're included in the request
  const authLink = setContext(
    (_: unknown, { headers }: { headers?: Record<string, string> }) => {
      return {
        headers: {
          ...headers,
        },
      };
    }
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    credentials: 'include',
  });
});
