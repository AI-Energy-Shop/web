import { HttpLink } from '@apollo/client';
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';

const PROTOCOL = process.env.NEXT_PUBLIC_BASE_PROTOCOL || 'http';
const HOST = process.env.NEXT_PUBLIC_BASE_URL_HOST || 'localhost:1337';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${PROTOCOL}://${HOST}/graphql`,
    }),
  });
});
