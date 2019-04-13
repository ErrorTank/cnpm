const User = require("./user");
const TokenConfirmation = require("../confirm-token/confirm-token");
const {sendEmail} = require("../../../email/index");
const crypto = require("crypto");

const getClientUserCache = (user) => {
  return new Promise((resolve, reject) => {
    let {accountID, role} = user;
    User.findById(accountID, '-password', (err, user) => {
      if (err) {
        console.log(err);
        throw new Error();
      }
      if (user) {
        console.log(user);
        resolve(user);
      } else {
        throw new ApolloError("User not found", "user_not_found")
      }
    })
  });

};
const register = (data) => {
  return new Promise((resolve, reject) => {
    let mockUser = new User(data);
    let error = mockUser.validateSync();
    if (error) {
      throw new ApolloError("Not match user schema", "not_match_user_schema")
    }
    User.findOne({email: data.email}, (err, user) => {
      if (err) {
        throw new Error();
      }
      console.log(user)
      if (user && user.isVerify) {
        throw new Error("email_taken");
      } else {
        let msg = !user ? "email_sent" : "not_verify";
        if (msg === 'not_verify') {
          resolve({message: msg});
        } else {
          mockUser.save((err) => {
            if (err)
              throw new Error();
            let token = new TokenConfirmation({_userId: mockUser._id, token: crypto.randomBytes(16).toString('hex')});
            token.save(err => {
              if (err)
                throw new Error();
              sendEmail("gmail", {
                from: "ncq998@gmail.com",
                to: data.email,
                subject: "Xác nhận đăng ký",
                template: "confirmation-email",
                context: {
                  appUrl: `${process.env.APP_URI}`,
                  redirect: `${process.env.APP_URI}/email-confirmation?invitation_code=${token.token}`,
                  name: data.fullname
                }
              }).then(() => resolve({message: msg}))

            });
          });

        }
      }
    });
  });
};

module.exports = {
  register,
  getClientUserCache
};