const Product = require("./product");

const omit = require("lodash/omit");
const pick = require("lodash/pick");

const getIndexDealProducts = ({skip = 0, take = 20}) => {
    console.log(new Date().toISOString());
    return Product.find({"options.deal.last": {$lt: new Date()}}, {_id:1, name: 1, deal:1, "options.price": 1, "options.total":1 , "options.sold": 1, "options.picture": 1},{skip, limit: take})

};

module.exports = {
    getIndexDealProducts
};