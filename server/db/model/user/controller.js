const User = require("./user");
const mongoose = require("mongoose");
const Product = require("../product/product");
const TokenConfirmation = require("../confirm-token/confirm-token");
const ResetPasswordToken = require("../reset-password-token/reset-password-token");
const {sendEmail} = require("../../../email/index");
const crypto = require("crypto");
const {ApolloError, AuthenticationError} = require("apollo-server-express");
const {createAuthToken} = require("../../../authorization/auth");
const {getPrivateKey, getPublicKey} = require("../../../authorization/keys/keys");
const omit = require("lodash/omit");
const pick = require("lodash/pick");

const getClientUserCache = (user) => {
  return new Promise((resolve, reject) => {
    let {_id, role} = user;
    User.findById(_id, '-password', (err, user) => {
      if (err) {
        console.log(err);
        reject(new AuthenticationError("login_required"));
      }
      if (user) {
        resolve(user);
      } else {
        reject(new AuthenticationError("login_required"))
      }
    })
  });

};

const resendConfirmEmail = ({email, redirect}) => {
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
              token: crypto.randomBytes(16).toString('hex'),
              redirect
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

const checkConfirmToken = ({token}) => {
  return TokenConfirmation.findOne({token}, "_userId redirect")
    .then(tokenObj => {
      if (!tokenObj) {
        return Promise.reject(new ApolloError("token_expire"));
      }
      return {userID: tokenObj._userId, redirect: tokenObj.redirect};
    })
    .then(({userID, redirect}) =>
      TokenConfirmation.deleteMany({_userId: userID})
        .then(() => ({userID, redirect}))
        .catch(err => Promise.reject(err))
    )
    .then(({userID, redirect}) => User.findOneAndUpdate({_id: userID}, {$set: {isVerify: true}}, {
      new: true,
      fields: "-password"
    }).lean().then(info => ({info, redirect})))
    .then(({info, redirect}) =>
      createAuthToken(pick(info, ["_id", "role", "email", "phone", "fullname", "isVerify"]), getPrivateKey(), {
        expiresIn: "30d",
        algorithm: "RS256"
      })
        .then(token => ({
          token,
          user: info,
          redirect
        }))
        .catch(err => Promise.reject(err))
    )
    .then(data => {
      console.log(data)
      return data;
    })
    .catch(err => Promise.reject(err))
};

const getSocialUserInfo = ({socialID}) => {
  return User.findOne({"social.id": socialID}).lean()
    .then(user => user ? createAuthToken(pick(user, ["_id", "role", "email", "phone", "fullname", "isVerify"]), getPrivateKey(), {
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

  return User.findOne({email: user.email}).lean()
    .then(data => {
      if (data)
        return Promise.reject(new ApolloError("account_taken"));
      return User.insertMany(user)
    })
    .then(([data]) =>
      createAuthToken(pick(data, ["_id", "role", "email", "phone", "fullname", "isVerify"]), getPrivateKey(), {
        expiresIn: "30d",
        algorithm: "RS256"
      })
        .then(token => ({
          token,
          user: omit(data, ["password"])
        }))
        .catch(err => Promise.reject(err))
    )
    .catch(err => Promise.reject(err))
};

const register = ({data, redirect}) => {
  return new Promise((resolve, reject) => {
    let mockUser = new User(data);
    User.findOne({email: data.email}, (err, user) => {
      if (err) {
        reject(new Error())
      }
      if (user && user.isVerify) {
        resolve(new ApolloError("account_taken"));
      } else {
        let msg = !user ? "email_sent" : "not_verify";
        if (msg === 'not_verify') {
          resolve({message: msg, redirect});
        } else {
          mockUser.save((err) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              let token = new TokenConfirmation({
                _userId: mockUser._id,
                token: crypto.randomBytes(16).toString('hex'),
                redirect
              });
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
                }).then(() => resolve({message: msg, redirect}))

              });
            }

          });

        }
      }
    });
  });
};

const regularLogin = payload => {
  return User.findOne({email: payload.email}).lean()
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
      createAuthToken(pick(data, ["_id", "role", "email", "phone", "fullname", "isVerify"]), getPrivateKey(), {
        expiresIn: "30d",
        algorithm: "RS256"
      })
        .then(token => ({
          token,
          user: omit(data, ["password"])
        }))
        .catch(err => Promise.reject(err))
    )
    .catch(err => Promise.reject(err))
};

const checkEmailExisted = email => {
  return User.findOne({email}).lean()
    .then(data => {
        if (!data) {
          return {
            value: "not_existed"
          };
        }
        if (!data.hasOwnProperty("password")){
          return {
            value: "belong_social"
          };
        }

        return {
          value: true
        };
      }
    )
    .catch(err => Promise.reject(err))
};

const confirmForgotPassword = email => {
  return User.findOne({email}).lean()
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
      if (!p)
        return Promise.reject(new ApolloError("token_expired"));
      return p._userId;
    })
    .then((userID) => User.updateOne({_id: userID}, {$set: {password: payload.password}}).then(() => userID).catch(err => Promise.reject(err)))
    .then((userID) => ResetPasswordToken.deleteMany({_userId: userID}).then(() => true).catch(err => Promise.reject(err)))
    .catch(err => Promise.reject(err))
};

const getUserRecentVisited = ({userID}) => {
  return User.findById(userID).then((user) => {
    if(user.recentVisit.length){
      return User.aggregate([
        {$match: {"_id": mongoose.Types.ObjectId(userID)}},
        {$unwind: "$recentVisit"},
        {$lookup: {from: 'products', localField: 'recentVisit.product', foreignField: '_id', as: "recentVisit.product"}},
        {
          $addFields: {
            'recentVisit.product': {
              $arrayElemAt: ["$recentVisit.product", 0]
            }
          }
        },
        {
          $group: {
            "_id": "$_id",
            "recentVisit": {
              $push: "$recentVisit"
            },
            "doc": {"$first": "$$ROOT"}
          }
        }
      ]).then(data => {
        // console.log(data)

        return {...omit(data[0], "doc"), ...omit(data[0].doc, "recentVisit")}
      })
    }
    return user;
  }).catch(err => Promise.reject(err))
};

const getCartItemByIdList = (rawList) => {
  let idList = rawList.map(each => mongoose.Types.ObjectId(each.product));
  let optionIdList = rawList.map(each => mongoose.Types.ObjectId(each.option));
  return Product.aggregate([
    {
      $match: {
       "_id": {
         $in: idList
       }
      }
    },
    {$lookup: {from: 'brands', localField: 'brand', foreignField: '_id', as: 'brand'}},
    {
      $addFields: {
        brand: {
          "$arrayElemAt": ["$brand", 0],
        },

      }
    },
    {$unwind: "$provider"},
    {$lookup: {from: 'users', localField: 'provider.owner', foreignField: '_id', as: "provider.owner"}},
    {
      $lookup: {
        from: 'discountwithcodes',
        localField: 'provider.discountWithCode',
        foreignField: '_id',
        as: 'provider.discountWithCode'
      }
    },
    {
      $addFields: {
        'provider.owner': {
          "$arrayElemAt": ['$provider.owner', 0],
        },
        "provider.discountWithCode": {

          "$arrayElemAt": ["$provider.discountWithCode", 0],
        }
      }
    },
    {$unwind: "$provider.options"},
    {
      $match: {
        "provider.options._id": {
          $in: optionIdList
        }
      }
    },
    {
      $group: {
        "_id": "$provider.options._id",
        name: {
          $first: '$name'
        },
        regularDiscount: {
          $first: '$regularDiscount'
        },
        productID: {
          $first: '$_id'
        },
        brand: {
          $first: '$brand'
        },
        deal: {
          $first: '$deal'
        },
        provider: {$push: "$provider"},
        optionArr: {$push: "$provider.options"}
      }
    },
    {
      $addFields: {
        "provider.options": "$optionArr",
        "_id": "$productID",
      }
    },
    {
      $addFields: {
        product: "$$CURRENT"
      }
    },
    {
      $project: {
        _id: 0,
        product:1,

      }
    }, {
      $project: {
        "product.optionArr": 0,

      }
    }

  ]).then(data => {

    let result = data.map(each => ({...each, quantity: rawList.find(item => item.option === each.product.provider[0].options[0]._id.toString()).quantity}));

    return result;
  })
};

const removeFromCart = ({userID, option}) => {
  return User.findOne({_id: userID}).lean()
    .then(data => {
      if (!data) {
        return Promise.reject(new ApolloError("user_not_found"))
      }
      return true;
    })
    .then(() => {
      return User.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(userID),
      }, {$pull: {"carts": {"option": mongoose.Types.ObjectId(option)}}}, {
        new: true,
        fields: "-password"
      }).lean()
    })
};

const mutateCart = ({cart, uID: userID}) => {
  return User.findOne({_id: userID}).lean()
    .then(data => {
      if (!data) {
        return Promise.reject(new ApolloError("user_not_found"))
      }
      return true;
    }).then(() =>
      User.findOneAndUpdate({_id: userID}, {carts: cart.map(each => ({...each, product: mongoose.Types.ObjectId(each.product), option: mongoose.Types.ObjectId(each.option)}))}, {new: true, fields: "-password"}).lean()
    )


};

const addToCart = ({userID, productID, qty, option}) => {
  return User.findOne({_id: userID}).lean()
    .then(data => {
      if (!data) {
        return Promise.reject(new ApolloError("user_not_found"))
      }
      let isExisted = data.carts.map(each => each.option.toString()).includes(option);
      if (!isExisted && data.carts.length === 10) {
        return Promise.reject(new ApolloError("full_cart"))
      }
      return isExisted;
    })
    .then((isExisted) => {
      let updateFunc = isExisted ? () => User.findOneAndUpdate({
        _id: userID,
        "carts.option": option
      }, {$inc: {"carts.$.quantity": Number(qty)}}, {
        new: true,
        fields: "-password"
      }) : () => User.findOneAndUpdate({_id: userID}, {
        $push: {
          carts: {
            product: mongoose.Types.ObjectId(productID),
            quantity: qty,
            option: mongoose.Types.ObjectId(option)
          }
        }
      }, {
        new: true,
        fields: "-password"
      });

      return updateFunc().lean();
    })

};

const addToFavorites = ({userID, productID}) => {
  return User.findOne({_id: userID}).lean()
    .then(data => {
      if (!data) {
        return Promise.reject(new ApolloError("user_not_found"))
      }

      return data.favorites.map(each => each.toString()).includes(productID);
    })
    .then((isExisted) => {

      console.log(isExisted)
      let updateExpr = isExisted ? {$pull: {favorites: mongoose.Types.ObjectId(productID)}} : {$push: {favorites: mongoose.Types.ObjectId(productID)}};
      return User.findOneAndUpdate({_id: userID}, updateExpr, {
        new: true,
        fields: "-password"
      }).lean();
    })

};

const getUser = ({userID}) => {
  return User.findById(userID).lean()

    .then(data => {
      // console.log(data)

      return data
    })
    .catch(err => Promise.reject(err))
};

const addRecentVisit = ({uID, pID}) => {
  return Product.findById(pID, "_id")
    .then(data => data ? data : Promise.reject(new ApolloError("product_not_found")))
    .then(data => User.findOne({_id: uID}).lean())
    .then(data => {


      if (data.recentVisit.find(each => {

        return each.product.toString() === pID
      })) {

        return User.findOneAndUpdate({
          _id: uID,
          "recentVisit.product": pID
        }, {$set: {"recentVisit.$.createdAt": Date.now()}})

      } else {
        if (data.recentVisit.length === 10) {
          let newArray = [...data.recentVisit];
          newArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          newArray.pop();
          newArray.push({createdAt: Date.now(), product: pID});
          return User.findOneAndUpdate({_id: uID}, {$set: {recentVisit: newArray}})
        }
        return User.findOneAndUpdate({_id: uID}, {$push: {recentVisit: {createdAt: Date.now(), product: pID}}})
      }

    })
    .then(() => true)
    .catch(() => false)
};

const getCacheProvidersInfo = () => {
  return User.aggregate([
    {
      $match: {"provider.name": {$exists: true}},

    }, {
      $project: {
        "provider.name": 1,
        "provider.email": 1,
        "provider.address": 1,
        "provider.phone": 1,
      }
    }, {
      $addFields: {
        name: "$provider.name",
        email: "$provider.email",
        address: "$provider.address",
        phone: "$provider.phone",
      }
    }, {
      $project: {
        name: 1,
        email: 1,
        address: 1,
        phone: 1,
      }
    }
  ]);
};

const updateUserInfo = ({data,file, userID}) => {
  let saveData = !file ? omit(data, ["picture"]) : {...data, picture: process.env.APP_URI + "/uploads/img/" + file.filename};
  return User.findOneAndUpdate({_id: mongoose.Types.ObjectId(userID)}, {...saveData}, {new: true, fields: "-password"}).lean()
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
  changePassword,
  getUser,
  addRecentVisit,
  getUserRecentVisited,
  addToFavorites,
  addToCart,
  getCartItemByIdList,
  getCacheProvidersInfo,
  removeFromCart,
  updateUserInfo,
  mutateCart
};