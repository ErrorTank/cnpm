const Product = require("./product");
const {transformProductDescribeFields} = require("../../../utils/common");
const omit = require("lodash/omit");
const pick = require("lodash/pick");
const {getCategories} = require("../category/controller");

const getIndexDealProducts = ({skip = 0, take = 20}) => {
  return Product.find({"deal.last": {$gt: new Date()}}, {
    _id: 1,
    regularDiscount: 1,
    name: 1,
    deal: 1,
    "options.price": 1,
    "options.total": 1,
    "options.sold": 1,
    "options.picture": 1,

  }, {skip, limit: take})
    .then(data => data)
    .catch(err => Promise.reject(err))

};

//Todo: provider populate to brand

const getProduct = ({productID}) => {
  return Product.findById(productID).populate("provider", "_id fullname phone email picture").populate("comments.author", "fullname picture").populate("comments.subComment.author", "fullname picture").lean()
    .then(data => {

      return new Promise((resolve, reject) => {
        getCategories(data.categories._id).then((categories) => {
          resolve(transformProductDescribeFields({...omit(data, "categories"), categories}));
        }).catch(err => reject(err));

      })
    })
    .then(data => data)
    .catch(err => Promise.reject(err))
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
  deleteComment
};