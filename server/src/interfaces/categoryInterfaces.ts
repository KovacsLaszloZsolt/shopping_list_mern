import mongoose, { Document } from 'mongoose';

export interface InCategory {
  name: string;
  owner: mongoose.ObjectId;
}

export interface InCategoryDoc extends Document, InCategory {}
