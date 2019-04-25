const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// 0: Regular user, 1: Seller(include Regular)
const billingSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: "User"
    },
    products: {
        type: [{
            qty: Number,
            details: {
                type: ObjectId,
                ref: "Product"
            }
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: 0
    },
    total: Number
});


const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;