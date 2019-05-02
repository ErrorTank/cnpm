const {authorizationUser, } = require("../../../authorization/auth");
const {checkConfirmToken, getClientUserCache, getSocialUserInfo, regularLogin, checkEmailExisted} = require("../../../db/model/user/controller");
const {getIndexDealProducts} = require("../../../db/model/product/controller");

const Query = {
  getAuthenUser: (parent, args, {request}, info) => {
    return authorizationUser(request)
      .then(() => {
        let creds = request.user;
        console.log(creds);
        return getClientUserCache(creds)
      })
      .catch(err => throw err);
  },
  checkConfirm: async (parent, args, {request}, info) => {
    return checkConfirmToken(args.token).then(data => data).catch(err => throw err);
  },
  getSocialUserInfo: async (parent, args, {request}, info) => {
    return getSocialUserInfo(args.socialID).then(data => data).catch(err => throw err);
  },
  regularLogin: async (parent, args, {request}, info) => {
    return regularLogin(args.payload).then(data => data).catch(err => throw err);
  },
  checkEmailExisted: async (parent, args, {request}, info) => {
    return checkEmailExisted(args.email).then(data => data).catch(err => throw err);
  },
  getIndexDealProducts:async (parent, args, {request}, info) => {
    return getIndexDealProducts(args).then(data => {console.log(data); return data}).catch(err => throw err);
  },
};

module.exports = Query;