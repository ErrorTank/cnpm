const Category = require("./category");

const getCategories = (cID) => {
  return Category.findOne({_id: cID}).then(data => {

    return data;
  }).catch(err => Promise.reject(err));
};

module.exports = {
  getCategories
};