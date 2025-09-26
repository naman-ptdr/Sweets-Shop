import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantityInStock: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export default mongoose.model('Sweet', sweetSchema);
