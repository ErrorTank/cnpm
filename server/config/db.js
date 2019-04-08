const mongoose = require("mongoose");
// const {DBError} = require("../utils/error/error-types");

module.exports = () => new Promise((resolve, reject) => {
  mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
      console.log("Connect to mongoDB successfully!");
      resolve()
    }).catch(err => {
      console.log("Cannot connect to mongoDB: \n", err);
      reject();
    }
  );

});






