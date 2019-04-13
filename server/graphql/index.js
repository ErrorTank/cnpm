const { importSchema } = require('graphql-import');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require( 'graphql-tools');
const {resolvers} = require("./resolvers");
const typeDefs = importSchema('./server/graphql/schema/index.graphql');



const initializeApolloServer = (app) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions :{
      requireResolversForResolveType: false
    },
  });
  console.log(process.env.NODE_ENV)
  const server = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV === "development" ? {
      settings: {
        'editor.theme': 'dark'
      }
    } : false,
    context: ({req}) => {
      return {
        request: req
      }
    },
  });
  server.applyMiddleware({ app , path: "/kappa"})
};

module.exports = initializeApolloServer;