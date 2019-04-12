const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname:  {
    type: String,
    minLength: 6,
    maxLength: 50,
    required: true
  },
  phone: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {type: String, required: true},
  dob: { type: Date},
  gender: {type: Boolean, default: 0},
  subscribe: {type: Boolean, default: 0}
});

const User = mongoose.model("User", userSchema);

module.exports = User;