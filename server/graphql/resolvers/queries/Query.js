const {authorizationUser} = require("../../../authorization/auth");
const User = require("../../../db/model/user/user");
const {checkConfirmToken} = require("../../../db/model/user/controller");

const Query = {
  getAuthenUser: (parent, args, {request}, info) => {
    authorizationUser(request).then(() => null).catch(err => throw err);
    let creds = request.user;
    return User.getClientUserCache(creds).then(data => data).catch(err => throw err);

  },
  checkConfirm: async (parent, args, {request}, info) => {
    return checkConfirmToken(args.token).then(data => data).catch(err => throw err);
  }
};

module.exports = Query;