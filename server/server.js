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
const Product = require("./db/model/product/product");

initializeDb().then(() => {
    let environment = process.env.NODE_ENV;


    configExpressServer(app);
    app.use('/', routerConfig());

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
    // Product.create({name: "Samsung Galaxy S10 256GB", provider: "5cc18eea1d4db822d4b0be13", categories: ["5cc185031db2bb2860dde2cd", "5cc185a31d4db822d4b0bdf0", "5cc196d3a0826d25a01882cd"], description: "Galaxy s10 description", options: [{price: 18000000, description: "", qty: 10, picture: ["https://www.google.com/search?q=s10&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjB-rzAkOvhAhWXdHAKHR_oDyYQ_AUIDigB&biw=1920&bih=969#imgrc=pRtRslD0ShvvRM:"], total: 100, sold: 0 ,deal: {last: "04/30/2019"}}]}).then((x) => console.log(x));
}).catch(err => {
    console.log(err)
    process.exit();
});




