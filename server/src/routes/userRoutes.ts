import { Router } from 'express';
import { signUp, signIn, getMe, signOut, updateMe } from '../controlers/userControlers';
import authHandler from '../middlewares/authHandler';

const userRouter = Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.get('/me', authHandler, getMe);
userRouter.post('/signout', authHandler, signOut);
userRouter.post('/me/update', authHandler, updateMe);

export default userRouter;
