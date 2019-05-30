const express = require('express');
const router = express.Router();
const ResetPasswordToken = require("../db/model/reset-password-token/reset-password-token");
const {restAuthMiddleware} = require("../authorization/auth");
const upload = require("../utils/img-uploader");
const {addNewComment} = require("../db/model/product/controller");

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

  router.post("/api/comment/create/:productID",  restAuthMiddleware, upload.array("picture" ,5), (req,res, next) => {
    let data = req.body;
    let files = req.files;

    addNewComment({data: {...data}, files:[...files], productID: req.params.productID}).then((cmt) => {
      console.log(cmt);
      res.status(200).json({comment: cmt});
    }).catch(err => next(err));
  });

  return router;
};