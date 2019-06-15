const {asynchronize} = require("./common");

let createFindCategories = (categories) => {
  let recursiveFindCategories = async (cID) => {
    let data = await asynchronize(() => categories.filter(each => each.parent === cID));

    if (!data.length) {
      return [cID];
    }
    let result = await Promise.all(data.map(each => recursiveFindCategories(each._id.toString())));
    return result.reduce((arr, cur) => arr.concat(cur),[])
  };
  return recursiveFindCategories;
};

module.exports = {
  createFindCategories
};