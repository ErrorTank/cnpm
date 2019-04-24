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
  let environment = process.env.NODE_ENV;
  const apollo = new ApolloServer({
    schema,
    playground: environment === "development" ? {
      settings: {
        'editor.theme': 'dark'
      }
    } : false,
    context: ({req}) => {
      return {
        request: req
      }
    }
  });

  apollo.applyMiddleware({ app , path: "/kappa"});

};

module.exports = initializeApolloServer;