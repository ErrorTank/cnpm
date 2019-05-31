const Category = require("./category");
const isNil = require("lodash/isNil");

const getCategories = (cID) => {
  return Category.findOne({_id: cID}).then(data => {
    console.log(data);
    return data;
  }).catch(err => Promise.reject(err));
};

const getCacheCategoriesInfo = () => {
  return Category.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        parent: 1
      }
    }
  ]).then((data) => {

    return data;
  });
};

module.exports = {
  getCategories,
  getCacheCategoriesInfo
};