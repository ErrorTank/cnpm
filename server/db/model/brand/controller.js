const Brand = require("./brand");
const isNil = require("lodash/isNil");
//
// const getCategories = (cID) => {
//   return Category.findOne({_id: cID}).then(data => {
//     return data;
//   }).catch(err => Promise.reject(err));
// };

const getCacheBrandsInfo = () => {
  return Brand.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        logo: 1
      }
    }
  ]).then((data) => {

    return data;
  });
};

module.exports = {

  getCacheBrandsInfo
};