
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
        type: ObjectId,
        ref: "Provider"
    },
    categories: {
        main: ObjectId,
        subs:  {
            type: [
                {
                    type: ObjectId,
                    ref: "Category"
                }
            ],
            required: false,
        },
        ref: "Category"
    },
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5]
    },
    description: String,
    seller: {
        type: ObjectId,
        ref: "User"
    },
    discountWithCode: {
        type: ObjectId,
        ref: "DiscountWithCode"
    },
    regularDiscount: Number,
    options: {
        type: [{
            price: Number,
            description: String,
            qty: Number,
            uploadDate: Date,
            picture: [String]
        }],
        required: true,
        validate: [(array)=>{
            return array.length >= 1;
        }, "Options cate length must > 0"],

    },

});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;