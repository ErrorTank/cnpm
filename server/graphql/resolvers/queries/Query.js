const {authorizationUser,} = require("../../../authorization/auth");
const {checkConfirmToken, getClientUserCache, getSocialUserInfo, regularLogin, checkEmailExisted, getUser, getUserRecentVisited, getCartItemByIdList, getCacheProvidersInfo, getFavoriteItemByIdList} = require("../../../db/model/user/controller");
const {getIndexDealProducts, getProduct, getBasicProduct, getProductComments, getProducts, findByKeyword} = require("../../../db/model/product/controller");
const {getCacheCategoriesInfo, getCategories} = require("../../../db/model/category/controller");
const {getCacheBrandsInfo} = require("../../../db/model/brand/controller");
const {fetchDistricts, fetchWards, fetchCities} = require("../../../db/model/location/controller");

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
    getFavItemsByIdList: async (parent, args, {request}, info) => {
      return getFavoriteItemByIdList(args).then(data => data).catch(err => throw err);
    },
    searchProducts: async (parent, args, {request}, info) => {
      return findByKeyword(decodeURIComponent(args.keyword)).then(data => data).catch(err => throw err);
    },
    getCacheProvidersInfo: async (parent, args, {request}, info) => {
      return getCacheProvidersInfo(args).then(data => data).catch(err => throw err);
    },
    getProductComments: async (parent, args, {request}, info) => {
      return getProductComments(args).then(data => data).catch(err => throw err);
    },
    fetchDistricts: async (parent, args, {request}, info) => {
      return fetchDistricts(args).then(data => data).catch(err => throw err);
    },
    fetchWards: async (parent, args, {request}, info) => {
      return fetchWards(args).then(data => data).catch(err => throw err);
    },
    fetchCities: async (parent, args, {request}, info) => {
      return fetchCities(args).then(data => {
        return data;
      }).catch(err => throw err);
    },
    getCartItemByIdList: async (parent, args, {request}, info) => {
      return getCartItemByIdList(args.list).then(data => data).catch(err => throw err);
    },
    checkConfirm: async (parent, args, {request}, info) => {
      return checkConfirmToken(args).then(data => data).catch(err => throw err);
    },
    getSocialUserInfo: async (parent, args, {request}, info) => {
      return getSocialUserInfo(args).then(data => data).catch(err => throw err);
    },
    findByKeyword: async (parent, args, {request}, info) => {
      return findByKeyword(args).then(data => data).catch(err => throw err);
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
    getProduct: async (parent, args, {request}, info) => {
      return getProduct(args).then(data => data).catch(err => throw err);
    },
    getBasicProduct: async (parent, args, {request}, info) => {
      return getBasicProduct(args).then(data => {
        return {...data, timeLeft: new Date(data.info.deal.last).getTime() - new Date().getTime()};
      }).catch(err => throw err);
    },
    getUser: async (parent, args, {request}, info) => {
      return getUser(args).then(data => {
        return data;
      }).catch(err => throw err);
    },
    getUserRecentVisited: async (parent, args, {request}, info) => {
      return getUserRecentVisited(args).then(data => {
        return data;
      }).catch(err => throw err);

    },
    getCacheBrandsInfo: async (parent, args, {request}, info) => {
      return getCacheBrandsInfo(args).then(data => {
        return data;
      }).catch(err => throw err);
    },
    getCacheCategoriesInfo: async (parent, args, {request}, info) => {
      return getCacheCategoriesInfo(args).then(data => {
        return data;
      }).catch(err => throw err);
    },
    getCategoriesParents: async (parent, args, {request}, info) => {
      return getCategories(args.categoryID).then(data => {
        return data;
      }).catch(err => throw err);
    },
    getProducts: async (parent, args, {request}, info) => {
      return getProducts(args, request).then(data => {
        return data;
      }).catch(err => throw err);
    },
  }
;

module.exports = Query;