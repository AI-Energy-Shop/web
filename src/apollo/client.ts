import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const PROTOCOL = process.env.BASE_PROTOCOL;
const HOST = process.env.BASE_URL_HOST;

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: `${PROTOCOL}://${HOST}/graphql`,
    // credentials: "same-origin",
    // headers: {
    //   cookie: req.header('Cookie'),
    // },
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
