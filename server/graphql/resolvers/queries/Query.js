const {authorizationUser,} = require("../../../authorization/auth");
const {checkConfirmToken, getClientUserCache, getSocialUserInfo, regularLogin, checkEmailExisted, getUser, getUserRecentVisited} = require("../../../db/model/user/controller");
const {getIndexDealProducts, getProduct, getBasicProduct, getProductComments} = require("../../../db/model/product/controller");

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
    getProductComments: async (parent, args, {request}, info) => {
      return getProductComments(args).then(data => data).catch(err => throw err);
    },
    checkConfirm: async (parent, args, {request}, info) => {
      return checkConfirmToken(args.token).then(data => data).catch(err => throw err);
    },
    getSocialUserInfo: async (parent, args, {request}, info) => {
      return getSocialUserInfo(args).then(data => data).catch(err => throw err);
    },
    regularLogin: async (parent, args, {request}, info) => {
      return regularLogin(args.payload).then(data => data).catch(err => throw err);
    },
    checkEmailExisted: async (parent, args, {request}, info) => {
      return checkEmailExisted(args.email).then(data => data).catch(err => throw err);
    },

    getIndexDealProducts: async (parent, args, {request}, info) => {
      return getIndexDealProducts(args).then(data => {

        return data.map(each => {

          let {deal} = each;
          let different = new Date(deal.last).getTime() - new Date().getTime();
          return {product: each, timeLeft: different}
        })
      }).catch(err => throw err);
    },
    getProduct:
      async (parent, args, {request}, info) => {
        return getProduct(args).then(data => data).catch(err => throw err);
      },
    getBasicProduct:
      async (parent, args, {request}, info) => {
        return getBasicProduct(args).then(data => {
          return {...data, timeLeft: new Date(data.info.deal.last).getTime() - new Date().getTime()};
        }).catch(err => throw err);
      },
    getUser:
      async (parent, args, {request}, info) => {
        return getUser(args).then(data => {
          return data;
        }).catch(err => throw err);
      },
    getUserRecentVisited:
      async (parent, args, {request}, info) => {
        return getUserRecentVisited(args).then(data => {
          return data;
        }).catch(err => throw err);
      },
  }
;

module.exports = Query;