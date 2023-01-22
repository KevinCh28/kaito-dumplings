import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    enum: ["Dumplings", "Gyoza"],
    default: "Dumplings",
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', ProductSchema);