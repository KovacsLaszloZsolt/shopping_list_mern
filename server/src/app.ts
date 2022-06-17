import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import categoryRouter from './routes/categoryRoutes';
import productRouter from './routes/productRoutes';
import userRouter from './routes/userRoutes';

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);

app.use(errorHandler);
app.use('*', (_req, res) => {
  res.status(404).send();
});

export default app;
