const mongoose = require("mongoose");
// const {DBError} = require("../utils/error/error-types");

const loadDbInstances = () => {


  require("../db/model/billing/billing");
  require("../db/model/brand/brand");
  require("../db/model/category/category");
  require("../db/model/confirm-token/confirm-token");
  require("../db/model/discount-with-code/discount-with-code");
  require("../db/model/product/product");
  require("../db/model/reset-password-token/reset-password-token");
  require("../db/model/user/user");
  require("../db/model/discount-with-code/discount-with-code");
  console.log('\x1b[36m%s\x1b[32m', "Load all db instances successfully!");
};

module.exports = () => new Promise((resolve, reject) => {

    mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useCreateIndex: true})
        .then(() => {
            console.log('\x1b[36m%s\x1b[32m', "Connect to mongoDB successfully!");
            loadDbInstances();
            // const {getCartItemByIdList} = require("../db/model/user/controller");
            // getCartItemByIdList([{option: "5cdccc8c2f86a8115c01762a",
            //   product: "5cc1bbb6eaa2491c50bcc16e",
            //   quantity: 4}]).then(data => console.log(data));
            resolve()
        }).catch(err => {
            console.log("Cannot connect to mongoDB: \n", err);
            reject();
        }
    );

});






