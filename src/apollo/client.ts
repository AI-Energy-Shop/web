import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const PROTOCOL = process.env.BASE_PROTOCOL;
const HOST = process.env.BASE_URL_HOST;

// const httpLink = new HttpLink({
//   uri: `${PROTOCOL}://${HOST}/graphql`,
//   credentials: "include",
// });

// export const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

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
});
