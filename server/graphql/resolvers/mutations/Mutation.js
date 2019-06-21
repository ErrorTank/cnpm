const {authorizationUser} = require("../../../authorization/auth");
const {register, resendConfirmEmail, registerSocial, confirmForgotPassword, changePassword, addRecentVisit, addToFavorites, addToCart, removeFromCart, mutateCart} = require("../../../db/model/user/controller");
const {replyComment} = require("../../../db/model/product/controller");

const Mutation = {
  register: async (parent, args, {request}, info) => {

    return register(args).then(msg => msg).catch(err => throw err);
  },
  resendConfirmEmail: async (parent, data, {request}, info) => {
    return resendConfirmEmail(data).then(msg => msg).catch(err => throw err);


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
  addToFavorites: async (parent, args, {request}, info) => {
    return addToFavorites(args).then(res => res).catch(err => throw err);
  },
  addToCart: async (parent, args, {request}, info) => {
    return addToCart(args).then(res => res).catch(err => throw err);
  },
  mutateCart: async (parent, args, {request}, info) => {
    return mutateCart(args).then(res => res).catch(err => throw err);
  },
  removeFromCart: async (parent, args, {request}, info) => {
    return removeFromCart(args).then(res => res).catch(err => throw err);
  },
  replyComment: async (parent, args, {request}, info) => {
    return replyComment(args).then(res => res).catch(err => throw err);
  },
};

module.exports = Mutation;