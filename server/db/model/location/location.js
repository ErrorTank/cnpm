const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const tempSchema = new Schema({
  foo: String,
  bar: String
}, {strict: false});



const City = mongoose.model("City", tempSchema);
const District = mongoose.model("District", tempSchema);
const Ward = mongoose.model("Ward", tempSchema);


module.exports = {
  City,
  District,
  Ward
};