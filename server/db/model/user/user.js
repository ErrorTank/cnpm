const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//0: Regular user, 1: Seller(include Regular)
const userSchema = new Schema({
  fullname: {
    type: String,
    minlength: 6,
    maxlength: 50,
    required: true
  },
  provider: {
    address: String,
    name: String,
    phone: String,
    email:String,
    products: {
      type: [
        {
          type: ObjectId,
          ref: "Product"
        }
      ],
      default: []
    }
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true
  },
  recentVisit: {
    type: [{
      createdAt: Date,
      product: {
        type: ObjectId,
        ref: "Product"
      }

    }],
    default: []
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {type: String},
  dob: {type: Date},
  gender: {type: Boolean, default: false},
  picture: String,
  subscribe: {type: Boolean, default: false},
  updatedAt: {type: Date},
  createdAt: {type: Date, default: Date.now},
  carts: {
    type: [{
      product: {
        type: ObjectId,
        ref: "Product"
      },
      quantity: Number
    }],
    default: []
  },
  favorites: {
    type: [{
      type: ObjectId,
      ref: "Product"
    }],
    default: []
  },
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