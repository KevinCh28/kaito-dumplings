import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    enum: ['Dumplings', 'Gyoza'],
    default: 'Dumplings',
    required: true,
    unique: true
  },
}, {
  timestamps: true
});

export default mongoose.model('Category', CategorySchema);