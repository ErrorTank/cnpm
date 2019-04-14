const User = require("./user");
const TokenConfirmation = require("../confirm-token/confirm-token");
const {sendEmail} = require("../../../email/index");
const crypto = require("crypto");
const {ApolloError, AuthenticationError} = require("apollo-server-express");

const getClientUserCache = (user) => {
  return new Promise((resolve, reject) => {
    let {_id, role} = user;
    User.findById(_id, '-password', (err, user) => {
      if (err) {
        console.log(err);
        reject(new AuthenticationError("login_required"));
      }
      if (user) {
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

          });
        }

      }


    });

  })
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

module.exports = {
  register,
  getClientUserCache,
  resendConfirmEmail
};