

const {authorizationUser} = require("../../../authorization/auth");
const {register} = require("../../../db/model/user/controller");

const Mutation = {
  register: async (parent, {data}, {request}, info) => {
    console.log(data);
    return register(data).then(msg => msg).catch(err => throw err);


  }
};

module.exports = Mutation;