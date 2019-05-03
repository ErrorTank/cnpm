const Product = require("./product");

const omit = require("lodash/omit");
const pick = require("lodash/pick");

const getIndexDealProducts = ({skip = 0, take = 20}) => {
    console.log(new Date().toISOString());
    return Product.find({"deal.last": {$gt: new Date()}}, {_id:1, regularDiscount:1 ,name: 1, deal:1, "options.price": 1, "options.total":1 , "options.sold": 1, "options.picture": 1},{skip, limit: take})
        .then(data => data)
        .catch(err => Promise.reject(err))

};

const getProduct = ({productID}) => {
    return Product.findById(productID).populate("categories", "_id name").populate("provider", "_id fullname phone email picture")
        .then(data => data)
        .catch(err => Promise.reject(err))
};

module.exports = {
    getIndexDealProducts,
    getProduct
};