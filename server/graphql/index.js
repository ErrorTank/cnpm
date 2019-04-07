const merge = require('lodash/merge');

const { ApolloServer } = require('apollo-server-express');
import { makeExecutableSchema } from 'graphql-tools';




const initializeApolloServer = (app) => {
  const schema = makeExecutableSchema({
    typeDefs: [],
    resolvers: merge()
  });

  const server = new ApolloServer({
    schema,
    playground: {
      endpoint: "/kappa"
    }
  });
  server.applyMiddleware({ app })
};

module.exports = initializeApolloServer;