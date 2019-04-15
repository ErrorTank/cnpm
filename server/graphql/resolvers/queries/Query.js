const {authorizationUser, } = require("../../../authorization/auth");
const {checkConfirmToken, getClientUserCache} = require("../../../db/model/user/controller");

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

};

module.exports = Query;