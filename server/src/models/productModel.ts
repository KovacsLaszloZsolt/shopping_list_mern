import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  note: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const Product = mongoose.model('Product', productSchema);
