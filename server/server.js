require('dotenv').config({path: './env/dev.env'});
const express = require("express");
const app = express();
const initializeDb = require("./config/db");
const initializeApolloServer = require("./graphql/index");
const configExpressServer = require("./config/express");
const routerConfig = require('./config/routes');
const https = require('https');
const fs = require("fs");
const path = require("path");
const DiscountWithCode = require("./db/model/discount-with-code/discount-with-code");
const {loadAllCache} = require("./cache/common");

initializeDb().then(() => loadAllCache()).then(() => {
    let environment = process.env.NODE_ENV;


    configExpressServer(app);
    app.use('/', routerConfig());
    app.use(require('./utils/error-handlers'));
    let server = https.createServer(
        {
            key: fs.readFileSync(path.join(__dirname, `./ssl/${environment}/${process.env.SSL_KEY_PATH}`)),
            cert: fs.readFileSync(path.join(__dirname, `./ssl/${environment}/${process.env.SSL_CRT_PATH}`))
        },
        app
    );
    initializeApolloServer(app, server);
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port: ${process.env.PORT}`);
    });
}).catch(err => {
    console.log(err)
    process.exit();
});




