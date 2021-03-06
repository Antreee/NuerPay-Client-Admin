import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const link = createHttpLink({
  uri: "https://orchestrator-nuerpay.herokuapp.com",
});

const authLink = setContext((_, { headers }) => {
  const access_token = localStorage.getItem("access_token");

  return {
    headers: {
      ...headers,
      authorization: access_token ? `${access_token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default client;
