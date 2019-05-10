const mongoose = require("mongoose");
// const {DBError} = require("../utils/error/error-types");

module.exports = () => new Promise((resolve, reject) => {

    mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useCreateIndex: true})
        .then(() => {
            console.log("Connect to mongoDB successfully!");
            require("../db/model/billing/billing");
            require("../db/model/brand/brand");
            require("../db/model/category/category");
            require("../db/model/confirm-token/confirm-token");
            require("../db/model/discount-with-code/discount-with-code");
            require("../db/model/product/product");
            require("../db/model/reset-password-token/reset-password-token");
            require("../db/model/user/user");

            resolve()
        }).catch(err => {
            console.log("Cannot connect to mongoDB: \n", err);
            reject();
        }
    );

});






