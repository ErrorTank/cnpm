const { importSchema } = require('graphql-import');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require( 'graphql-tools');
const {resolvers} = require("./resolvers");
const typeDefs = importSchema('./server/graphql/schema/index.graphql');



const initializeApolloServer = (app) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });
  console.log(process.env.NODE_ENV)
  const server = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV === "development" ? {
      endpoint: "/server/kappa",
      settings: {
        'editor.theme': 'dark'
      }
    } : false
  });
  server.applyMiddleware({ app , path: "/server"})
};

module.exports = initializeApolloServer;