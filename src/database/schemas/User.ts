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
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }]
}, {
  timestamps: true
});

export default mongoose.model('User', UserSchema);