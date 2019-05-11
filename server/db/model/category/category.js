const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: ObjectId,
    ref: "Category",
    default: null
  }
});


const Category = mongoose.model("Category", categorySchema);


module.exports = Category;