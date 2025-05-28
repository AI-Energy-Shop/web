'use client';

import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { useState, useEffect } from 'react';

const PROTOCOL = process.env.NEXT_PUBLIC_BASE_PROTOCOL || 'http';
const HOST = process.env.NEXT_PUBLIC_BASE_URL_HOST || 'localhost:1337';

function makeClient(token?: string) {
  const httpLink = new HttpLink({
    uri: `${PROTOCOL}://${HOST}/graphql`,
    fetchOptions: { cache: 'no-store' },
  });

  const authLink = setContext(
    (_: unknown, { headers }: { headers?: Record<string, string> }) => {
      return {
        headers: {
          ...headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };
    }
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    credentials: 'include',
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const [client, setClient] = useState<ApolloClient<unknown>>();

  useEffect(() => {
    const token =
      typeof window !== 'undefined'
        ? document.cookie
            .split('; ')
            .find((row) => row.startsWith('a-token='))
            ?.split('=')[1]
        : undefined;

    const client = makeClient(token);

    setClient(client);
  }, []);

  if (!client) {
    return null;
  }

  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}
