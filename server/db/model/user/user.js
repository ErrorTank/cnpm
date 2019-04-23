const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//0: Regular user, 1: Seller(include Regular)
const userSchema = new Schema({
  fullname:  {
    type: String,
    minlength: 6,
    maxlength: 50,
    required: true
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {type: String},
  dob: { type: Date},
  gender: {type: Boolean, default: false},
  subscribe: {type: Boolean, default: false},
  updatedAt: { type: Date},
  createdAt: { type: Date},
  role: {type: Number, required: true, default: 0},
  isVerify: {type: Boolean, default: false, required: true},
  social: {
    id: String,
    type: {
      type: String,
      enum: ['GOOGLE', 'FACEBOOK']
    },

  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;