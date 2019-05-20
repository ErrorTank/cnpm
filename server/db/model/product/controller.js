const Product = require("./product");
const omit = require("lodash/omit");
const pick = require("lodash/pick");
const {getCategories} = require("../category/controller");
const mongoose = require("mongoose");

const getIndexDealProducts = ({skip = 0, take = 20}) => {
  // return Product.find({"deal.last": {$gt: new Date()}}, {
  //   _id: 1,
  //   regularDiscount: 1,
  //   name: 1,
  //   deal: 1,
  //   discountWithCode: 1,
  //   "options.price": 1,
  //   "options.total": 1,
  //   "options.sold": 1,
  //   "options.picture": 1,
  //   "options._id": 1,
  // }, {skip, limit: take})
  //   .populate("discountWithCode", "_id code value").lean()
  //   .then(data => {
  //
  //     return data;
  //   })
  //   .catch(err => Promise.reject(err))
  return Product.aggregate([
    {
      $match:
        {
          "deal.last": {$gt: new Date()}
        }
    },
    {$skip: skip},
    {$limit: take},
    {
      $project: {
        _id: 1,
        regularDiscount: 1,
        name: 1,
        deal: 1,
        provider: {
          $slice: ["$provider", 0, 1]
        },

      }

    },


  ]).exec().then(data => {

    return data;
  })
    .catch(err => Promise.reject(err))
};

//Todo: provider populate to brand


const getProduct = ({productID}) => {

  return Product.findById(productID).populate("provider", "_id fullname phone email picture").populate("discountWithCode", "_id code value").lean()
    .then(data => {

      return new Promise((resolve, reject) => {

        getCategories(data.categories._id).then((categories) => {
          resolve({...omit(data, "categories"), categories});
        }).catch(err => reject(err));

      })
    })
    .then(data => data)
    .catch(err => Promise.reject(err))
};

const getProductComments = ({productID, skip, take, sortByStar}) => {
  let getSort = {
    "ASC": 1,
    "DESC": -1,
  };
  let pipeline = [
    {$match: {"_id": mongoose.Types.ObjectId(productID)}},
    {
      $project: {
        "comments": 1,
        "_id": 1
      }
    },
    {
      $unwind: "$comments"
    },
    {$lookup: {from: 'users', localField: 'comments.author', foreignField: '_id', as: 'comments.author'}},
    {
      $addFields: {
        'comments.author': {
          "$arrayElemAt": ['$comments.author', 0],
        },

      }
    },
    {
      $unwind: "$comments.subComment"
    },

    {
      $lookup: {
        from: 'users',
        localField: 'comments.subComment.author',
        foreignField: '_id',
        as: 'comments.subComment.author'
      }
    },
    {
      $addFields: {
        'comments.subComment.author': {
          "$arrayElemAt": ['$comments.subComment.author', 0],
        },

      }
    },
    {
      $group: {
        "_id": "$comments._id",
        "oldID": {$first: "$_id"},
        "comments": {$first: "$comments"},
        "subComment": {$push: "$comments.subComment"},

      }
    },
    {
      $addFields: {
        "comments.subComment": "$subComment"
      }
    },
    {
      $group: {
        "_id": "$oldID",
        "comments": {$push: "$comments"},
      }
    },

  ];
  if(getSort.hasOwnProperty(sortByStar)){
    pipeline.push({$sort: {"comments.rating": getSort[sortByStar]}});
  }else{
    pipeline.push({$sort: {"comments.updatedAt": -1}});
  }
  pipeline = pipeline.concat([{$skip: skip}, {$limit: take}]);
  return Product.aggregate(pipeline)
    .then((data) => {
      console.log(data[0].comments[0].subComment)
      return data[0];
    })
};

const getBasicProduct = ({productID}) => {

  return Product.aggregate([
    {$match: {"_id": mongoose.Types.ObjectId(productID)}},
    {
      "$addFields": {
        "meanStar": {
          "$divide": [
            {
              "$reduce": {
                "input": "$comments",
                "initialValue": 0,
                "in": {"$add": ["$$value", "$$this.rating"]}
              }
            },
            {
              "$cond": [
                {"$ne": [{"$size": "$comments"}, 0]},
                {"$size": "$comments"},
                1
              ]
            }
          ]
        },
        "commentCount": {
          $size: "$comments"
        }
      }
    },
    {$lookup: {from: 'brands', localField: 'brand', foreignField: '_id', as: 'brand'}},

    {
      $addFields: {
        brand: {
          "$arrayElemAt": ["$brand", 0],
        },

      }
    },
    {$unwind: "$provider"},
    {$lookup: {from: 'users', localField: 'provider.owner', foreignField: '_id', as: "provider.owner"}},
    {
      $lookup: {
        from: 'discountwithcodes',
        localField: 'provider.discountWithCode',
        foreignField: '_id',
        as: 'provider.discountWithCode'
      }
    },
    {
      $addFields: {
        'provider.owner': {
          "$arrayElemAt": ['$provider.owner', 0],
        },
        "provider.discountWithCode": {

          "$arrayElemAt": ["$provider.discountWithCode", 0],
        }
      }
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: '$name'
        },
        description: {
          $first: '$description'
        },
        regularDiscount: {
          $first: '$regularDiscount'
        },
        describeFields: {
          $first: '$describeFields'
        },
        brand: {
          $first: '$brand'
        },
        commentCount: {
          $first: '$commentCount'
        },
        meanStar: {
          $first: '$meanStar'
        },
        deal: {
          $first: '$deal'
        },
        categories: {
          $first: '$categories'
        },
        provider: {$push: "$provider"}
      }
    }


  ]).exec().then(([{meanStar, commentCount, ...rest}]) => {
    return new Promise((resolve, reject) => {

      getCategories(rest.categories._id).then((categories) => {

        resolve({
          info: {...omit(rest, "categories"), categories},
          meanStar: meanStar,
          commentCount
        });
      }).catch(err => reject(err));

    });

  })

};


const addComment = ({pID, comment}) => {
  return Product.findOneAndUpdate({_id: pID},
    {$push: {comments: comment}},
    {new: true},
    (err, doc) => {
      if (err) {
        // handle err
      }
      if (doc) {
        //new documet here.
      }
    })
};

const editComment = ({pID, cId, comment}) => {
  let updateBlock = {};
  if (comment.rating)
    updateBlock['comments.$.rating'] = comment.rating;
  if (comment.title)
    updateBlock['comments.$.title'] = comment.title;
  if (comment.content)
    updateBlock['comments.$.content'] = comment.content;
  if (comment.picture)
    updateBlock['comments.$.picture'] = comment.picture;
  updateBlock['comments.$.updatedAt'] = Date.now();

  return Product.findOneAndUpdate({_id: pID, 'comments._id': cID},
    {'$set': updateBlock},
    {new: true},
    (err, doc) => {
      if (err) {
        //handle err
      }
      if (doc) {
        //new documet here.
      }
    });
};

const deleteComment = ({pID, cID}) => {
  return Product.findOneAndUpdate({_id: pID},
    {$pull: {comments: {_id: cID}}},
    {new: true},
    (err, doc) => {
      if (err) {
        // handle err
      }
      if (doc) {
        //new documet here.
      }
    })
};


module.exports = {
  getIndexDealProducts,
  getProduct,
  addComment,
  editComment,
  deleteComment,
  getProductComments,
  getBasicProduct
};