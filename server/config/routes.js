const express = require('express');
const router = express.Router();
const ResetPasswordToken = require("../db/model/reset-password-token/reset-password-token");

module.exports = () => {
  router.get("/confirm-reset-password", (req, res, next) => {
    let {reset_code = null} = req.query;
    if(!reset_code){
      res.redirect("/");
    }else{
      ResetPasswordToken.findOne({token: reset_code})
        .then(token => {
          if(!token){
            res.redirect("/");
          }else{
            console.log(process.cwd() + "/" + process.env.HTML_DIR)
            res.sendFile(process.cwd() + "/" + process.env.HTML_DIR);
          }
        })
        .catch(err => {
          res.redirect("/");
        })
    }
  });
  return router;
};