const {briefCategoriesCache} = require("./async-cache");

const loadAllCache = () => {
  return Promise.all([briefCategoriesCache.get()])
};

module.exports = {
  loadAllCache
};