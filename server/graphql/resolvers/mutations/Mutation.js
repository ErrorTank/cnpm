

const {authorizationUser} = require("../../../authorization/auth");
const {register, resendConfirmEmail} = require("../../../db/model/user/controller");

const Mutation = {
  register: async (parent, {data}, {request}, info) => {
    console.log(data);
    return register(data).then(msg => msg).catch(err => throw err);


  },
  resendConfirmEmail: async (parent, {email}, {request}, info) => {
    return resendConfirmEmail(email).then(msg => msg).catch(err => throw err);


  },
};

module.exports = Mutation;