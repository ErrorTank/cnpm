const jwt = require("jsonwebtoken");
const {getPrivateKey, getPublicKey} = require("../authorization/keys/keys");
const {AuthenticationError} = require("apollo-server-express");
const omit = require("lodash/omit");

const decodeAuthRequest = (req, secret, config) => {
  return new Promise((resolve, reject) => {
    let authHeader = req.headers.authorization;
    if (!authHeader || authHeader.replace(/^Bearer /, '') === 'null'){

      reject();
    }else{
      let token = authHeader.replace(/^Bearer /, '');
      verifyToken(token, secret, config).then((user) => {

        resolve(user);
      }).catch(err => {
        reject(err);
      })
    }
  })
};



const createAuthToken = (userInfo, secret, config) =>{
  console.log(userInfo)
  return new Promise((resolve, reject) => {
    jwt.sign(omit(userInfo, ["comments", "password", "favorites", "carts", "recentVisit"]), secret, config, (err, token) => {
      if(err){
        console.log(err);
        reject(new Error("fail_generate_token"));
      }else{
        resolve(token);
      }
    });
  })
};

const verifyToken = (token, secret, config) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, config,  (err, data) => {
      if(err){
        console.log(err);
        reject(err);
      }else{
        resolve(data);
      }
    })
  });
};




const authorization = (secret, config) => {
  return (req) => {
    return new Promise((resolve, reject) => {
      decodeAuthRequest(req, secret, config)
        .then((user) => {
          if (!user) {
            reject(new Error('must_authenticate'));
          } else {
            req.user = user;
            resolve()
          }
        }).catch(err => {
          console.log(err);
          reject(new Error('must_authenticate'));
      })
    })

  }
};



const authorizationUser = authorization(getPublicKey(), {expiresIn: "30d", algorithm: ["RS256"]});

const restAuthMiddleware = (req, res, next) => {

  authorizationUser(req).then(() => next()).catch(err => next(err))
};

module.exports = {
  authorizationUser,
  decodeAuthRequest,
  verifyToken,
  restAuthMiddleware,
  createAuthToken
};
