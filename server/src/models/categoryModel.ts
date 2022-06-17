import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const Category = mongoose.model('Category', categorySchema);
