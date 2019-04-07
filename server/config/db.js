const mongoose = require("mongoose");
// const {DBError} = require("../utils/error/error-types");

module.exports = () => new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', err => {
        console.log("Cannot connect to mongoDB: \n", err);
        reject();
    });
    db.once('open', () => {
        console.log("Connect to mongoDB successfully!");
        resolve();
    });
});






