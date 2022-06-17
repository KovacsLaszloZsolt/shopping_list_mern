import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { InCategoryDoc } from '../interfaces/categoryInterfaces';
import { CustomRequest, InUserDoc } from '../interfaces/userInterfaces';
import { Category } from '../models/categoryModel';

export const getAllCategories = asyncHandler(async (req: CustomRequest, res) => {
  const user = req.user as InUserDoc;
  const allCategoriesByUser = await Category.find({ owner: user._id as mongoose.ObjectId });

  res.status(200).json(allCategoriesByUser);
});

export const createCategory = asyncHandler(async (req: CustomRequest, res) => {
  const user = req.user as InUserDoc;
  const { name } = req.body as { name: string };

  if (!name) {
    res.status(400).json({ error: 'Name required' });
  }

  const category = new Category({
    name,
    owner: user._id as mongoose.ObjectId,
  }) as InCategoryDoc;

  await category.save();

  res.status(201).json(category);
});
