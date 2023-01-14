import mongoose from "mongoose";
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
  password: {
    type: String,
    required: true
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Orders'
  }],
  role: {
    type: String,
    enum: ['Customer', 'Admin'],
    default: 'Customer',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('User', UserSchema);