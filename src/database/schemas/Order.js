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
  },
  total: {
    type: Number,
    require: true
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', OrderSchema);