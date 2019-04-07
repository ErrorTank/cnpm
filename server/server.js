require('dotenv').config({path: 'dev.env'});

const app = require("./config/express");
const initializeDb = require("./config/db");
const initializeApolloServer = require("./graphql/index");

initializeDb().then(() => {
    initializeApolloServer(app);
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port: ${process.env.PORT}` );
    });
}).catch(err => {
    process.exit();
});




