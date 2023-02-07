const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }]
}, {
  timestamps: true
});

module.exports = User = mongoose.model('User', UserSchema);