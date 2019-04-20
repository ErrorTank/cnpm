require('dotenv').config({path: './env/dev.env'});
const express = require("express");
const app = express();
const initializeDb = require("./config/db");
const initializeApolloServer = require("./graphql/index");
const configExpressServer = require("./config/express");
const routerConfig = require('./config/routes');

initializeDb().then(() => {
    initializeApolloServer(app);
    configExpressServer(app);
    app.use('/', routerConfig());
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port: ${process.env.PORT}` );
    });
}).catch(err => {
    console.log(err)
    process.exit();
});




