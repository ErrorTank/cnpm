const {City, Ward, District} = require("./location");
const isNil = require("lodash/isNil");
//
// const getCategories = (cID) => {
//   return Category.findOne({_id: cID}).then(data => {
//     return data;
//   }).catch(err => Promise.reject(err));
// };

const fetchCities = () => {
  return City.find().lean()
};
const fetchDistricts = ({parent}) => {
  return District.find({"parent_code": parent}).lean()
};
const fetchWards = ({parent}) => {
  return Ward.find({"parent_code": parent}).lean()
};


module.exports = {
  fetchCities,
  fetchWards,
  fetchDistricts
};