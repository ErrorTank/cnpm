const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 0: Regular user, 1: Seller(include Regular)
const categorySchema = new Schema({
   name: {
       type: String,
       required: true
   }
});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;