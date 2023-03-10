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
      productName: {
        type: String,
        required: true
      },
      productPrice: {
        type: Number,
        required: true
      },
      productImage: {
        type: String,
        required: true
      },
      procuctCategory: {
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