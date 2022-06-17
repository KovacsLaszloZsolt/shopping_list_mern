import { Request } from 'express';
import { Document, Model } from 'mongoose';

export interface CustomRequest extends Request {
  token?: string;
  user?: unknown;
}

export interface InToken {
  token: string;
}
export interface InUser {
  name: string;
  email: string;
  password: string;
  tokens: InToken[];
}

export interface InUserDoc extends InUser, Document {
  generateAuthToken: () => Promise<string>;
}
export interface InUserModel extends Model<InUser> {
  findByCredital: (email: string, password: string) => Promise<InUserDoc>;
}
