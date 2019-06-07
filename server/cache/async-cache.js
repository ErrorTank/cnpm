const {createApiCache} = require("../../client/common/cache/api-cache/api-cache");
const Category = require("../db/model/category/category");

const briefCategoriesCache = createApiCache(() => Category.find().lean().then(data => data.map(each => ({...each, parent: each.parent ? each.parent._id.toString() : null}))));

module.exports = {
  briefCategoriesCache
};


