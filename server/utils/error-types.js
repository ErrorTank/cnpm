const assignIn = require("lodash/assignIn");

const CustomError = (name) => {
  return class extends Error{
    constructor(message = 'Kappa error', extra = null){
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = name;
      this.extra = extra;

    }
  }
};
// function CustomError(name) {
//   let err =  assignIn(function (message, extra) {
//     console.log(this)
//     console.log(this.constructor)
//     Error.captureStackTrace(this, this.constructor);
//     this.name = name;
//     this.message = message;
//     this.extra = extra;
// }, Error);
//
//   return err;
// }

module.exports = {
  AuthorizationError: CustomError("AuthorizationError"),
  ApplicationError: CustomError("ApplicationError"),
  OperatorError: CustomError("OperatorError"),
  DBError: CustomError("DBError"),
  JWTError: CustomError("JWTError")
};
