const User = require("./user");
const TokenConfirmation = require("../confirm-token/confirm-token");
const ResetPasswordToken = require("../reset-password-token/reset-password-token");
const {sendEmail} = require("../../../email/index");
const crypto = require("crypto");
const {ApolloError, AuthenticationError} = require("apollo-server-express");
const {createAuthToken} = require("../../../authorization/auth");
const {getPrivateKey, getPublicKey} = require("../../../authorization/keys/keys");
const omit = require("lodash/omit");

const getClientUserCache = (user) => {
  return new Promise((resolve, reject) => {
    let {_id, role} = user;
    User.findById(_id, '-password', (err, user) => {
      if (err) {
        console.log(err);
        reject(new AuthenticationError("login_required"));
      }
      if (user) {
        console.log("con cac")
        console.log(user);
        resolve(user);
      } else {
        reject(new AuthenticationError("login_required"))
      }
    })
  });

};

const resendConfirmEmail = email => {
  return new Promise((resolve, reject) => {
    User.findOne({email}, (err, user) => {
      if (err) {
        reject(new Error())
      } else {
        if (!user) {
          reject(new ApolloError("user_not_found"))
        } else {
          TokenConfirmation.deleteMany({_userId: user._id}).then(() => {
            let newToken = new TokenConfirmation({
              _userId: user._id,
              token: crypto.randomBytes(16).toString('hex')
            });
            newToken.save((err) => {
              if (err) {
                reject(new Error())

              } else {
                sendEmail("gmail", {
                  from: "TAKA | Mua sắm trực tuyến",
                  to: email,
                  subject: "Xác nhận đăng ký",
                  template: "confirmation-email",
                  context: {
                    appUrl: `${process.env.APP_URI}`,
                    redirect: `${process.env.APP_URI}/email-confirmation?invitation_code=${newToken.token}`,
                    name: user.fullname
                  }
                }).then(() => resolve())
              }

            }).catch(err => {
              reject(err)
            });
          });

        }

      }


    });

  })
};

const checkConfirmToken = token => {
  return TokenConfirmation.findOne({token}, "_userId")
    .then(tokenObj => {
      if (!tokenObj) {
        return Promise.reject(new ApolloError("token_expire"));
      }
      return tokenObj._userId;
    })
    .then(userID =>
      TokenConfirmation.deleteMany({_userId: userID})
        .then(() => userID)
        .catch(err => Promise.reject(err))
    )
    .then(userID => User.findOneAndUpdate({_id: userID}, {$set: {isVerify: true}}, {new: true, fields: "-password"}))
    .then(info =>
      createAuthToken(info, getPrivateKey(), {expiresIn: "30d", algorithm: "RS256"})
        .then(token => ({
          token,
          user: info
        }))
        .catch(err => Promise.reject(err))
    )
    .then(data => data)
    .catch(err => Promise.reject(err))
};

const getSocialUserInfo = socialID => {
  return User.findOne({"social.id": socialID})
    .then(user => user ? createAuthToken(omit(user, ["password", "social"]), getPrivateKey(), {
      expiresIn: "30d",
      algorithm: "RS256"
    })
      .then(token => ({
        token,
        user: omit(user, ["password"])
      }))
      .catch(err => Promise.reject(err)) : Promise.reject(new ApolloError("not_existed")))
    .catch(err => Promise.reject(err))

};

const registerSocial = user => {

  return User.findOne({email: user.email})
    .then(data => {
      if (data)
        return Promise.reject(new ApolloError("account_taken"));
      return User.insertMany(user)
    })
    .then(([data]) =>
      createAuthToken(omit(data, ["password", "social"]), getPrivateKey(), {expiresIn: "30d", algorithm: "RS256"})
        .then(token => ({
          token,
          user: omit(data, ["password"])
        }))
        .catch(err => Promise.reject(err))
    )
    .catch(err => Promise.reject(err))
};

const register = (data) => {
  return new Promise((resolve, reject) => {
    let mockUser = new User(data);
    let error = mockUser.validateSync();
    if (error) {
      reject(new Error())
    }
    User.findOne({email: data.email}, (err, user) => {
      if (err) {
        reject(new Error())
      }
      if (user && user.isVerify) {
        resolve(new ApolloError("account_taken"));
      } else {
        let msg = !user ? "email_sent" : "not_verify";
        if (msg === 'not_verify') {
          resolve({message: msg});
        } else {
          mockUser.save((err) => {
            if (err)
              reject(new Error());
            let token = new TokenConfirmation({_userId: mockUser._id, token: crypto.randomBytes(16).toString('hex')});
            token.save(err => {
              if (err)
                reject(new Error());
              sendEmail("gmail", {
                from: "TAKA | Mua sắm trực tuyến",
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

const regularLogin = payload => {
  return User.findOne({email: payload.email})
    .then(data => {
      if (!data) {
        return Promise.reject(new ApolloError("not_existed"))
      }
      if (data.hasOwnProperty("social")) {
        return Promise.reject(new ApolloError(data.social.type === "GOOGLE" ? "gg_taken" : "fb_taken"))
      }
      if (!data.isVerify) {
        return Promise.reject(new ApolloError("not_verified"))
      }
      if (data.password !== payload.password)
        return Promise.reject(new ApolloError("password_wrong"));
      return data;

    })
    .then((data) =>
      createAuthToken(omit(data, ["password"]), getPrivateKey(), {expiresIn: "30d", algorithm: "RS256"})
        .then(token => ({
          token,
          user: omit(data, ["password"])
        }))
        .catch(err => Promise.reject(err))
    )
    .catch(err => Promise.reject(err))
};

const checkEmailExisted = email => {
  return User.findOne({email})
    .then(data => {
        return !!data
      }
    )
    .catch(err => Promise.reject(err))
};

const confirmForgotPassword = email => {
  return User.findOne({email})
    .then(user => ResetPasswordToken.deleteMany({_userId: user._id}).then(() => user).catch(err => Promise.reject(err)))
    .then(user => {
      let token = new ResetPasswordToken({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
      token.save().then(() => {
        return sendEmail("gmail", {
          from: "TAKA | Mua sắm trực tuyến",
          to: user.email,
          subject: "Xác nhận đổi mật khẩu",
          template: "reset-password",
          context: {
            appUrl: `${process.env.APP_URI}`,
            redirect: `${process.env.APP_URI}/confirm-reset-password?reset_code=${token.token}`,
            name: user.fullname
          }
        }).then(() => Promise.resolve())

      }).catch(err => Promise.reject(err));
    }).catch(err => Promise.reject(err))
};

const changePassword = payload => {
  return ResetPasswordToken.findOne({token: payload.token})
    .then((p) => {
      if(!p)
        return Promise.reject(new ApolloError("token_expired"));
      return p._userId;
    })
    .then((userID) => User.updateOne({_id: userID}, {$set: {password: payload.password}}).then(() => userID).catch(err => Promise.reject(err)))
    .then((userID) => ResetPasswordToken.deleteMany({_userId: userID}).then(() => true).catch(err => Promise.reject(err)))
    .catch(err => Promise.reject(err))
};

module.exports = {
  register,
  getClientUserCache,
  resendConfirmEmail,
  checkConfirmToken,
  getSocialUserInfo,
  registerSocial,
  regularLogin,
  checkEmailExisted,
  confirmForgotPassword,
  changePassword
};