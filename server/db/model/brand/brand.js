const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const brandSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  logo: String
});


const Brand = mongoose.model("Brand", brandSchema);



module.exports = Brand;