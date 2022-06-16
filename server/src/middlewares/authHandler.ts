import asyncHandler from 'express-async-handler';
import JWT from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/userModel';
import { CustomRequest } from '../interfaces/userInterfaces';

const authHandler = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const auth = req.headers.authorization;

  if (!auth) {
    res.status(400).json({ error: 'Invalid token' });
    return;
  }

  const token = auth.replace('Bearer ', '');

  const decoded = JWT.verify(token, process.env.JWT_PRIVATE_KEY!) as mongoose.ObjectId;

  const user = await User.findOne({ _id: decoded, 'tokens.token': token });

  if (!user) {
    res.status(400).json({ error: 'Invalid token' });
    return;
  }

  req.token = token;
  req.user = user;
  next();
});

export default authHandler;
