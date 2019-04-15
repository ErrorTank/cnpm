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
  role: {type: Number, required: true},
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