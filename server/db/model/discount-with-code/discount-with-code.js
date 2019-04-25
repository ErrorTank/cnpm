const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DiscountWithCodeSchema = new Schema({
  code: String,
  value: Number
});


const DiscountWithCode = mongoose.model("DiscountWithCode", DiscountWithCodeSchema);



module.exports = DiscountWithCode;