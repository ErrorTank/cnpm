
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

// 0: Regular user, 1: Seller(include Regular)
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: [
            {
                owner: {
                    type: ObjectId,
                    ref: "User"
                },
                options: {
                    type: [{
                        price: Number,
                        description: String,
                        total: Number,
                        sold: {type: Number, default: 0},
                        picture: [String],
                        describeFields: {
                            type: String,
                            default: null
                        },

                    }],
                    required: true,
                    validate: [(array)=>{
                        return array.length >= 1;
                    }, "Options cate length must > 0"],

                },
                discountWithCode: {
                    type: ObjectId,
                    ref: "DiscountWithCode"
                },
            }
        ],
        required: true
    },
    describeFields: {
        type: String,
        default: null
    },
    brand: {
        type: ObjectId,
        ref: "Brand"
    },
    categories: {
        type: ObjectId,
        ref: "Category"
    },
    comments: [{
        rating: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5],
            default: 0
        },
        author: {
            type: ObjectId,
            ref: "User",

        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        title: String,
        content: String,
        picture: [String],
        default: [],
        subComment: {
            type: [{
                author: {
                    type: ObjectId,
                    ref: "User",
                },
                content: String,

            }],
            default: []
        }
    }],
    description: String,

    regularDiscount: Number,
    deal: {
        last: Date
    },


});






const Product = mongoose.model("Product", productSchema);

module.exports = Product;