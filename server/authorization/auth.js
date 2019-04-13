const jwt = require("jsonwebtoken");
const {getPrivateKey, getPublicKey} = require("../authorization/keys/keys");

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
  return new Promise((resolve, reject) => {
    jwt.sign(userInfo, secret, config, (err, token) => {
      if(err){
        console.log(err);
        reject(new JWTError("Fail to generate token"));
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
            throw new AuthenticationError('must authenticate');
          } else {
            req.user = user;
            resolve()
          }
        }).catch(err => {
          console.log(err);
          throw new AuthenticationError('must authenticate');
      })
    })

  }
};

const authorizationUser = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = {
  authorizationUser,
  decodeAuthRequest,
  verifyToken,
  createAuthToken
};
