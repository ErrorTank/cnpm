
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
                type: ObjectId,
                ref: "User"
            }
        ],
        required: true
    },
    categories: {
        type: [
            {
                type: ObjectId,
                ref: "Category"
            }
        ],
        default: []
    },
    comments: [{
        rating: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5]
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
        default: []
    }],
    description: String,

    discountWithCode: {
        type: ObjectId,
        ref: "DiscountWithCode"
    },
    regularDiscount: Number,

    options: {
        type: [{
            price: Number,
            description: String,
            total: Number,
            sold: {type: Number, default: 0},
            picture: [String],
            deal: {
                last: Date
            }
        }],
        required: true,
        validate: [(array)=>{
            return array.length >= 1;
        }, "Options cate length must > 0"],

    },

});



const Product = mongoose.model("Product", productSchema);

module.exports = Product;