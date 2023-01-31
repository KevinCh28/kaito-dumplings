import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orderNumber: {
    type: String,
    require: true,
    unique: true
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'transit', 'completed', 'refunded', 'canceled'],
    default: 'pending'
  },
  total: {
    type: Number,
    require: true
  },
  items: {
    type: Array,
    require: true
  },
  date: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', OrderSchema);