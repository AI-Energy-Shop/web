'use client';
// ^ this file needs the "use client" pragma

import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { setContext } from '@apollo/client/link/context';

const PROTOCOL = process.env.NEXT_PUBLIC_BASE_PROTOCOL || 'http';
const HOST = process.env.NEXT_PUBLIC_BASE_URL_HOST || 'localhost:1337';

// have a function to create a client for you
function makeClient() {
  const httpLink = new HttpLink({
    uri: `${PROTOCOL}://${HOST}/graphql`,
    fetchOptions: { cache: 'no-store' },
  });

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('a-token='))
    ?.split('=')[1];

  console.log(token);
  // Since we're using cookies, we just need to ensure they're included in the request
  const authLink = setContext(
    (_: unknown, { headers }: { headers?: Record<string, string> }) => {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: token ? authLink.concat(httpLink) : httpLink,
    credentials: 'include', // This ensures cookies are sent with requests
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
