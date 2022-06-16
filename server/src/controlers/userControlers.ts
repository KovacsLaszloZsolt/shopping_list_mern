import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CustomRequest, InUser, InUserDoc } from '../interfaces/userInterfaces';
import { User } from '../models/userModel';
import updateIsValidFields from '../utils/updateIsValidFields';

export const signUp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body as InUser;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email and password required' });
    return;
  }

  const user = new User({
    name,
    email,
    password,
    tokens: [],
  }) as unknown as InUserDoc;

  const token = await user.generateAuthToken();

  res.status(201).json({ token, user });
});

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    res.status(400).json({ error: 'Email/password required' });
  }

  const user = await User.findByCredital(email, password);
  const token = await user.generateAuthToken();

  res.status(200).json({ token, user });
});

export const getMe = asyncHandler(async (req: CustomRequest, res): Promise<void> => {
  const user = req.user as InUserDoc;
  const token = req.token;

  res.status(200).json({ token, user });
});

export const signOut = asyncHandler(async (req: CustomRequest, res): Promise<void> => {
  const user = req.user as InUserDoc;
  const currentToken = req.token as string;

  user.tokens = user.tokens.filter((token) => token.token !== currentToken);
  await user.save();

  res.status(200).json({});
});

export const updateMe = asyncHandler(async (req: CustomRequest, res): Promise<void> => {
  const user = req.user as InUserDoc;
  const fieldsForUpdate = req.body as Partial<InUserDoc>;

  const validUpdateFields = ['name', 'email', 'password'];

  if (!updateIsValidFields(validUpdateFields, Object.keys(fieldsForUpdate))) {
    res.status(400).json({ error: 'Invalid fields' });
    return;
  }

  user.set(fieldsForUpdate);
  await user.save();

  res.status(200).json({ user });
});
