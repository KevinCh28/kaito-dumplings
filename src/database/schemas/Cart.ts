import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // Array of Product Ids and quantity
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

export default mongoose.model('Cart', CartSchema);