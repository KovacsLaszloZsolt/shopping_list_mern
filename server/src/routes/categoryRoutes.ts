import { Router } from 'express';
import { getAllCategories, createCategory } from '../controlers/categoryController';
import authHandler from '../middlewares/authHandler';

const categoryRouter = Router();

categoryRouter.get('', authHandler, getAllCategories);
categoryRouter.post('', authHandler, createCategory);

export default categoryRouter;
