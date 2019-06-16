const Product = require("./product");
const User = require("../user/user");
const Category = require("../category/category");
const omit = require("lodash/omit");
const pick = require("lodash/pick");
const { getCategories } = require("../category/controller");
const mongoose = require("mongoose");
const { briefCategoriesCache } = require("../../../cache/async-cache");
const { createFindCategories } = require("../../../utils/categories");
const uniq = require("lodash/uniq");
const uniqBy = require("lodash/uniqBy");

const getIndexDealProducts = ({ skip = 0, take = 20 }) => {
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
      $match: {
        "deal.last": { $gt: new Date() }
      }
    },
    { $skip: skip },
    { $limit: take },
    {
      $project: {
        _id: 1,
        regularDiscount: 1,
        name: 1,
        deal: 1,
        provider: {
          $slice: ["$provider", 0, 1]
        }
      }
    }
  ])
    .exec()
    .then(data => {
      return data;
    })
    .catch(err => Promise.reject(err));
};

//Todo: provider populate to brand

const getProduct = ({ productID }) => {
  return Product.findById(productID)
    .populate("provider", "_id fullname phone email picture")
    .populate("discountWithCode", "_id code value")
    .lean()
    .then(data => {
      return new Promise((resolve, reject) => {
        getCategories(data.categories._id)
          .then(categories => {
            resolve({ ...omit(data, "categories"), categories });
          })
          .catch(err => reject(err));
      });
    })
    .then(data => data)
    .catch(err => Promise.reject(err));
};

const getProductComments = ({ productID, skip, take, sortByStar }) => {
  let getSort = {
    ASC: 1,
    DESC: -1
  };
  let starFilter = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5
  };

  let pipeline = [
    { $match: { _id: mongoose.Types.ObjectId(productID) } },
    {
      $project: {
        comments: 1,
        _id: 1
      }
    },
    {
      $unwind: "$comments"
    }
  ];

  return Product.findById(productID)
    .lean()
    .then(item => {
      if (item.comments.length) {
        pipeline = pipeline.concat([
          {
            $lookup: {
              from: "users",
              localField: "comments.author",
              foreignField: "_id",
              as: "comments.author"
            }
          },
          {
            $addFields: {
              "comments.author": {
                $arrayElemAt: ["$comments.author", 0]
              }
            }
          },
          {
            $unwind: {
              path: "$comments.subComment",
              preserveNullAndEmptyArrays: true
            }
          },

          {
            $lookup: {
              from: "users",
              localField: "comments.subComment.author",
              foreignField: "_id",
              as: "comments.subComment.author"
            }
          },
          {
            $addFields: {
              "comments.subComment.author": {
                $arrayElemAt: ["$comments.subComment.author", 0]
              }
            }
          },
          {
            $group: {
              _id: "$comments._id",
              oldID: { $first: "$_id" },
              comments: { $first: "$comments" },
              subComment: { $push: "$comments.subComment" }
            }
          },
          {
            $addFields: {
              "comments.subComment": "$subComment"
            }
          },
          {
            $group: {
              _id: "$oldID",
              comments: { $push: "$comments" }
            }
          }
        ]);
        if (getSort.hasOwnProperty(sortByStar)) {
          console.log(getSort[sortByStar]);
          pipeline = pipeline.concat([
            { $unwind: "$comments" },
            { $sort: { "comments.rating": getSort[sortByStar] } },
            { $group: { _id: "$_id", comments: { $push: "$comments" } } }
          ]);
        } else if (starFilter.hasOwnProperty(sortByStar)) {
          pipeline.push({
            $project: {
              _id: 1,
              comments: {
                $filter: {
                  input: "$comments",
                  as: "comment",
                  cond: {
                    $eq: [
                      { $floor: "$$comment.rating" },
                      starFilter[sortByStar]
                    ]
                  }
                }
              }
            }
          });
        } else {
          pipeline = pipeline.concat([
            { $unwind: "$comments" },
            { $sort: { "comments.updatedAt": -1 } },
            { $group: { _id: "$_id", comments: { $push: "$comments" } } }
          ]);
        }
        pipeline = pipeline.concat([{ $skip: skip }, { $limit: take }]);
        return Product.aggregate(pipeline).then(data => {
          return {
            ...data[0],
            comments: data[0].comments.map(each => {
              return !each.subComment[0]._id
                ? { ...each, subComment: [] }
                : each;
            })
          };
        });
      }
      return item;
    });
};

const replyComment = ({ productID, commentID, data }) => {
  let newID = mongoose.Types.ObjectId();
  return Product.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(productID),
      "comments._id": mongoose.Types.ObjectId(commentID)
    },
    {
      $push: {
        "comments.$.subComment": {
          $each: [{ ...data, _id: newID }],
          $position: 0
        }
      }
    },
    { new: true }
  )
    .populate("comments.subComment.author", "_id fullname picture")
    .lean()
    .then(newProduct => {
      console.log(
        newProduct.comments
          .find(each => each._id.toString() === commentID)
          .subComment.find(each => each._id.toString() === newID.toString())
      );
      return newProduct.comments
        .find(each => each._id.toString() === commentID)
        .subComment.find(each => each._id.toString() === newID.toString());
    });
};

const getBasicProduct = ({ productID }) => {
  return Product.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(productID) } },
    {
      $addFields: {
        meanStar: {
          $divide: [
            {
              $reduce: {
                input: "$comments",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.rating"] }
              }
            },
            {
              $cond: [
                { $ne: [{ $size: "$comments" }, 0] },
                { $size: "$comments" },
                1
              ]
            }
          ]
        },
        commentCount: {
          $size: "$comments"
        }
      }
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand"
      }
    },

    {
      $addFields: {
        brand: {
          $arrayElemAt: ["$brand", 0]
        }
      }
    },
    { $unwind: "$provider" },
    {
      $lookup: {
        from: "users",
        localField: "provider.owner",
        foreignField: "_id",
        as: "provider.owner"
      }
    },
    {
      $lookup: {
        from: "discountwithcodes",
        localField: "provider.discountWithCode",
        foreignField: "_id",
        as: "provider.discountWithCode"
      }
    },
    {
      $addFields: {
        "provider.owner": {
          $arrayElemAt: ["$provider.owner", 0]
        },
        "provider.discountWithCode": {
          $arrayElemAt: ["$provider.discountWithCode", 0]
        }
      }
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name"
        },
        description: {
          $first: "$description"
        },
        regularDiscount: {
          $first: "$regularDiscount"
        },
        describeFields: {
          $first: "$describeFields"
        },
        brand: {
          $first: "$brand"
        },
        commentCount: {
          $first: "$commentCount"
        },
        meanStar: {
          $first: "$meanStar"
        },
        deal: {
          $first: "$deal"
        },
        categories: {
          $first: "$categories"
        },
        provider: { $push: "$provider" }
      }
    }
  ])
    .exec()
    .then(([{ meanStar, commentCount, ...rest }]) => {
      return new Promise((resolve, reject) => {
        getCategories(rest.categories._id)
          .then(categories => {
            resolve({
              info: { ...omit(rest, "categories"), categories },
              meanStar: meanStar,
              commentCount
            });
          })
          .catch(err => reject(err));
      });
    });
};

const editComment = ({ pID, cId, comment }) => {
  let updateBlock = {};
  if (comment.rating) updateBlock["comments.$.rating"] = comment.rating;
  if (comment.title) updateBlock["comments.$.title"] = comment.title;
  if (comment.content) updateBlock["comments.$.content"] = comment.content;
  if (comment.picture) updateBlock["comments.$.picture"] = comment.picture;
  updateBlock["comments.$.updatedAt"] = Date.now();

  return Product.findOneAndUpdate(
    { _id: pID, "comments._id": cID },
    { $set: updateBlock },
    { new: true },
    (err, doc) => {
      if (err) {
        //handle err
      }
      if (doc) {
        //new documet here.
      }
    }
  );
};

const addNewComment = ({ data, files, productID }) => {
  let saveData = {
    ...data,
    picture: files.map(
      each => process.env.APP_URI + "/uploads/img/" + each.filename
    )
  };
  let newId = mongoose.Types.ObjectId();
  return Product.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(productID) },
    {
      $push: {
        comments: { ...saveData, _id: newId }
      }
    },
    { new: true }
  )
    .lean()
    .then(newData => {
      let { comments } = newData;
      let result = comments.find(
        each => each._id.toString() === newId.toString()
      );
      return User.findById(result.author, "_id fullname picture role")
        .lean()
        .then(author => {
          console.log({ ...result, author });
          return { ...result, author };
        });
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const getProducts = (
  {
    mainFilter,
    productFilter,
    categoryID,
    skip,
    take,
    rating,
    brand,
    provider,
    priceRange
  },
  request
) => {
  // let {keyword, sort} = mainFilter;

  let sorter = {
    mostDiscount: {
      regularDiscount: -1
    },
    descPrice: {
      minPrice: 1
    },
    ascPrice: {
      minPrice: -1
    },
    mostSale: {
      mostSale: -1
    }
  };

  let startTime = Date.now();
  return briefCategoriesCache.get().then(categories => {
    let findFunc = createFindCategories(categories);
    return findFunc(categoryID)
      .then(data => {
        let pipelines = [];
        if (mainFilter.keyword) {
          pipelines.push({
            // $match: { $text: { $search:  "\"" + mainFilter.keyword + "\""} }
            $match: { name: { $regex: mainFilter.keyword, $options: "i" } }
          });
        }

        pipelines = pipelines.concat([
          {
            $match: {
              categories: {
                $in: data.map(each => mongoose.Types.ObjectId(each))
              }
            }
          },
          {
            $addFields: {
              meanStar: {
                $divide: [
                  {
                    $reduce: {
                      input: "$comments",
                      initialValue: 0,
                      in: { $add: ["$$value", "$$this.rating"] }
                    }
                  },
                  {
                    $cond: [
                      { $ne: [{ $size: "$comments" }, 0] },
                      { $size: "$comments" },
                      1
                    ]
                  }
                ]
              },
              commentCount: {
                $size: "$comments"
              }
            }
          },
          {
            $project: {
              _id: 1,
              name: 1,
              regularDiscount: 1,
              brand: 1,
              deal: 1,
              categories: 1,
              provider: 1,
              commentCount: 1,
              meanStar: 1
            }
          },
          {
            $lookup: {
              from: "brands",
              localField: "brand",
              foreignField: "_id",
              as: "brand"
            }
          },

          {
            $addFields: {
              brand: {
                $arrayElemAt: ["$brand", 0]
              }
            }
          },
          { $unwind: "$provider" },

          {
            $lookup: {
              from: "users",
              localField: "provider.owner",
              foreignField: "_id",
              as: "provider.owner"
            }
          },
          {
            $lookup: {
              from: "discountwithcodes",
              localField: "provider.discountWithCode",
              foreignField: "_id",
              as: "provider.discountWithCode"
            }
          },
          {
            $addFields: {
              "provider.owner": {
                $arrayElemAt: ["$provider.owner", 0]
              },
              "provider.discountWithCode": {
                $arrayElemAt: ["$provider.discountWithCode", 0]
              }
            }
          }
        ]);
        //Thiet bi deo thong minh bug
        pipelines = pipelines.concat([
          { $unwind: "$provider.options" },
          {
            $group: {
              _id: {
                productID: "$_id",
                providerID: "$provider._id"
              },
              name: {
                $first: "$name"
              },
              commentCount: {
                $first: "$commentCount"
              },
              meanStar: {
                $first: "$meanStar"
              },
              regularDiscount: {
                $first: "$regularDiscount"
              },
              brand: {
                $first: "$brand"
              },
              deal: {
                $first: "$deal"
              },
              categories: {
                $first: "$categories"
              },
              provider: {
                $first: "$provider"
              },
              minPrice: {
                $min: "$provider.options.price"
              },
              mostSale: {
                $max: "$provider.options.sold"
              },
              options: { $push: "$provider.options" }
            }
          },
          {
            $addFields: {
              provider: {
                _id: "$provider._id",
                owner: "$provider.owner",
                discountWithCode: "$provider.discountWithCode",
                options: "$options"
              }
            }
          },
          {
            $group: {
              _id: "$_id.productID",
              name: {
                $first: "$name"
              },
              regularDiscount: {
                $first: "$regularDiscount"
              },
              commentCount: {
                $first: "$commentCount"
              },
              meanStar: {
                $first: "$meanStar"
              },
              brand: {
                $first: "$brand"
              },
              deal: {
                $first: "$deal"
              },
              categories: {
                $first: "$categories"
              },
              minPrice: {
                $min: "$minPrice"
              },
              mostSale: {
                $max: "$mostSale"
              },

              provider: { $push: "$provider" }
            }
          },

          {
            $addFields: {
              minPrice: {
                $multiply: [
                  "$minPrice",
                  { $subtract: [1, { $divide: ["$regularDiscount", 100] }] }
                ]
              }
            }
          }
        ]);
        if (mainFilter.sort && sorter.hasOwnProperty(mainFilter.sort)) {
          pipelines.push({ $sort: sorter[mainFilter.sort] });
        }
        // else{
        //   pipelines.push({
        //     $group: {
        //       _id: "$_id",
        //       name: {
        //         $first: '$name'
        //       },
        //       regularDiscount: {
        //         $first: '$regularDiscount'
        //       },
        //       brand: {
        //         $first: '$brand'
        //       },
        //       commentCount: {
        //         $first: '$commentCount'
        //       },
        //       meanStar: {
        //         $first: '$meanStar'
        //       },
        //       deal: {
        //         $first: '$deal'
        //       },
        //       categories: {
        //         $first: '$categories'
        //       },
        //
        //       "provider": {$push: "$provider"},
        //     },
        //
        //   },);
        // }
        if (rating) {
          pipelines.push({
            $match: { meanStar: { $gte: rating } }
          });
        }
        if (brand) {
          pipelines.push({
            $match: { "brand._id": mongoose.Types.ObjectId(brand) }
          });
        }
        if (provider) {
          pipelines.push({
            $match: { "provider.owner._id": mongoose.Types.ObjectId(provider) }
          });
        }

        if (priceRange && priceRange.split("_").length) {
          let [from, to] = priceRange.split("_");
          console.log(from);
          console.log(to);
          if (
            !isNaN(Number(from)) &&
            !isNaN(Number(to)) &&
            (Number(from) !== 0 || Number(to) !== 0)
          )
            pipelines.push({
              $match: { minPrice: { $gte: Number(from), $lte: Number(to) } }
            });
        }
        pipelines.push({
          $project: {
            _id: 1,
            meanStar: 1,
            commentCount: 1,
            name: 1,
            regularDiscount: 1,
            brand: 1,
            deal: 1,
            categories: 1,
            provider: 1,
            minPrice: 1
          }
        });
        return Product.aggregate(pipelines);
      })
      .then(data => {
        let allCates = briefCategoriesCache.syncGet();
        let currentCateIsParent = !!allCates.find(
          each => each.parent === categoryID
        );
        let currentCate = allCates.find(
          each => each._id.toString() === categoryID
        );
        let providers = uniqBy(
          data.reduce((result, each) => {
            return [
              ...result,
              ...each.provider.map(item => ({
                _id: item.owner._id.toString(),
                name: item.owner.provider.name
              }))
            ];
          }, []),
          "_id"
        ).map(each => ({
          ...each,
          count: data.filter(prod =>
            prod.provider.find(item => item.owner._id.toString() === each._id)
          ).length
        }));
        let brands = uniqBy(
          data.map(each => ({ ...each.brand, _id: each.brand._id.toString() })),
          "_id"
        ).map(each => ({
          ...each,
          count: data.filter(prod => prod.brand._id.toString() === each._id)
            .length
        }));

        return {
          products: data.slice(skip, skip + take).map(each => {
            let { meanStar, commentCount, ...rest } = each;
            return {
              info: rest,
              meanStar,
              commentCount
            };
          }),
          total: data.length,
          execTime: (Date.now() - startTime).toString(),
          productFilters: {
            categories: {
              _id: currentCateIsParent
                ? categoryID
                : allCates.find(
                    each => each._id.toString() === currentCate.parent
                  )._id,
              name: currentCateIsParent
                ? currentCate.name
                : allCates.find(
                    each => each._id.toString() === currentCate.parent
                  ).name,
              childs: allCates
                .filter(each =>
                  uniq(data.map(prod => prod.categories.toString())).includes(
                    each._id.toString()
                  )
                )
                .map(each => ({
                  ...each,
                  count: data.filter(
                    item => item.categories.toString() === each._id.toString()
                  ).length
                }))
            },
            providers,
            brands
          }
        };
      });
  });
};

const findByKeyword = keywords => {
  return Product.find({
    $text: { $search: keywords }
  })
    .then(products => {
      return products;
    })
    .catch(err => console.log(err));
};

module.exports = {
  getIndexDealProducts,
  getProduct,
  getProductComments,
  getBasicProduct,
  replyComment,
  addNewComment,
  getProducts,
  findByKeyword
};
