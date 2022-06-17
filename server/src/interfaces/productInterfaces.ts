import mongoose, { Document } from 'mongoose';

export interface InProduct {
  name: string;
  note?: string;
  category: string;
  owner: mongoose.ObjectId;
}

export interface InProductDoc extends Document, InProduct {}
