const {authorizationUser} = require("../../../authorization/auth");
const User = require("../../../db/model/user/user");

const Query = {
  getAuthenUser: async (parent, args, {request}, info) => {
    await authorizationUser(request);
    let creds = request.user;
    return User.getClientUserCache(creds);

  }
};

module.exports = Query;