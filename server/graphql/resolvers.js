const resolvers = {
  Query: require('./resolvers/queries/Query'),
  Mutation: require('./resolvers/mutations/Mutation'),
  CheckEmailUnion: {
    __resolveType(obj, context, info) {
      if (typeof obj.value === "string") {
        return 'StringBox';
      }

      if (typeof obj.value === "boolean") {
        return 'BoolBox';
      }

      return null;
    },

  },
};

module.exports = {
  resolvers
};