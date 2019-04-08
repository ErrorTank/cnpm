require('dotenv').config({path: './env/dev.env'});
const express = require("express");
const app = express();
const initializeDb = require("./config/db");
const initializeApolloServer = require("./graphql/index");
const configExpressServer = require("./config/express");

initializeDb().then(() => {
    initializeApolloServer(app);
    configExpressServer(app);
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port: ${process.env.PORT}` );
    });
}).catch(err => {
    console.log(err)
    process.exit();
});




