import ApolloClient from "apollo-boost";
import getHeaders from "./utils/get-header"

let client = null;

const initClient = () => {
  client = new ApolloClient({
    uri: process.env.GRAPHQL_URI,
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors);
      console.log('networkError', networkError)
    },
    request: async (operation) => {

      operation.setContext({
        headers: getHeaders()
      });
    },
  });
};

export {initClient as default, client};