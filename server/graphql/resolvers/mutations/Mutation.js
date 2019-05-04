

const {authorizationUser} = require("../../../authorization/auth");
const {register, resendConfirmEmail, registerSocial, confirmForgotPassword, changePassword, addRecentVisit} = require("../../../db/model/user/controller");

const Mutation = {
  register: async (parent, {data}, {request}, info) => {
    console.log(data);
    return register(data).then(msg => msg).catch(err => throw err);
  },
  resendConfirmEmail: async (parent, {email}, {request}, info) => {
    return resendConfirmEmail(email).then(msg => msg).catch(err => throw err);


  },
  registerSocial: async (parent, {data}, {request}, info) => {
    return registerSocial(data).then(user => user).catch(err => throw err);
  },
  confirmForgotPassword: async (parent, {email}, {request}, info) => {
    return confirmForgotPassword(email).then(res => res).catch(err => throw err);
  },
  changePassword: async (parent, {payload}, {request}, info) => {
    return changePassword(payload).then(res => res).catch(err => throw err);
  },
  addRecentVisit: async (parent, args, {request}, info) => {
    return addRecentVisit(args).then(res => res).catch(err => throw err);
  },
};

module.exports = Mutation;