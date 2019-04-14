const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema =  new Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires : "2m" }
});
// tokenSchema.index({ createdAt: 1 }, { expires : "2m" });

const TokenConfirmation = mongoose.model("TokenConfirmation", tokenSchema);

module.exports = TokenConfirmation;