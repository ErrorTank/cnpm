const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 0: Regular user, 1: Seller(include Regular)
const billingSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});


const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;