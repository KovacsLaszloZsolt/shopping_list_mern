import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { InCategoryDoc } from '../interfaces/categoryInterfaces';
import { InProduct, InProductDoc } from '../interfaces/productInterfaces';
import { CustomRequest, InUserDoc } from '../interfaces/userInterfaces';
import { Category } from '../models/categoryModel';
import { Product } from '../models/productModel';
import updateIsValidFields from '../utils/updateIsValidFields';

export const getAllProducts = asyncHandler(async (req: CustomRequest, res) => {
  const user = req.user as InUserDoc;

  const allProductByUser = await Product.find({ owner: user._id as mongoose.ObjectId }, '_id name category');

  res.status(200).json({ allProductByUser });
});

export const getProductByCategory = asyncHandler(async (req: CustomRequest, res) => {
  const user = req.user as InUserDoc;
  const category = req.params.category;

  const productByCategory = await Product.find({ category: category, owner: user._id as mongoose.ObjectId }, 'name');

  res.status(200).json(productByCategory);
});
export const getSingleProduct = asyncHandler(async (req: CustomRequest, res) => {
  const user = req.user as InUserDoc;
  const productId = req.params.id as unknown as mongoose.ObjectId;

  const reqProduct = await Product.find({ _id: productId, owner: user._id as mongoose.ObjectId });

  if (!reqProduct) {
    res.status(404).json({ error: 'Product not exist' });
    return;
  }

  res.status(200).json(reqProduct);
});

export const createNewProduct = asyncHandler(async (req: CustomRequest, res) => {
  const { name, category, note } = req.body as Partial<InProduct>;
  const user = req.user as InUserDoc;
  const userId = user._id as mongoose.ObjectId;

  if (!name || !category) {
    res.status(400).json({ error: 'Name / category required' });
    return;
  }

  const categories: Partial<InCategoryDoc>[] = await Category.find({ owner: userId }, 'name');

  if (!categories.map((category) => category.name).includes(category)) {
    res.status(400).json({ error: 'Category not exist' });
  }

  const product = new Product({
    name,
    category,
    note,
    owner: userId,
  }) as InProductDoc;

  await product.save();

  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req: CustomRequest, res) => {
  const user = req.user as InUserDoc;
  const productId = req.params.id as unknown as mongoose.ObjectId;
  const fieldsForUpdate = req.body as Partial<InProduct>;
  const validUpdateFields = ['name', 'note', 'category'];

  if (!updateIsValidFields(validUpdateFields, Object.keys(fieldsForUpdate))) {
    res.status(400).json({ error: 'Invalid fields' });
    return;
  }

  const reqProduct = (await Product.findOne({ _id: productId, owner: user._id as mongoose.ObjectId })) as InProductDoc;

  if (!reqProduct) {
    res.status(404).json({ error: 'Product not exist' });
    return;
  }

  reqProduct.set(fieldsForUpdate);
  await reqProduct.save();

  res.status(200).json(reqProduct);
});

export const deleteProduct = asyncHandler(async (req: CustomRequest, res) => {
  const user = req.user as InUserDoc;
  const productId = req.params.id as unknown as mongoose.ObjectId;

  await Product.findOneAndDelete({ _id: productId, owner: user._id as mongoose.ObjectId });

  res.status(200).json();
});
