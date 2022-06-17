import { Router } from 'express';
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategory,
  getSingleProduct,
  updateProduct,
} from '../controlers/productContolers';
import authHandler from '../middlewares/authHandler';

const productRouter = Router();

productRouter.get('', authHandler, getAllProducts);
productRouter.get('/category/:category', authHandler, getProductByCategory);
productRouter.get('/:id', authHandler, getSingleProduct);
productRouter.post('', authHandler, createNewProduct);
productRouter.post('/:id', authHandler, updateProduct);
productRouter.delete('/:id', authHandler, deleteProduct);

export default productRouter;
