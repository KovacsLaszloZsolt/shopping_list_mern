import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { InUser, InUserDoc, InUserModel } from '../interfaces/userInterfaces';
import { CustomError } from './customErrorModel';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new CustomError('Email is invalid!', 400);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value: string) {
        if (!validator.isStrongPassword(value)) {
          throw new CustomError('Password is invalid', 400);
        }
      },
    },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.generateAuthToken = async function (this: InUserDoc) {
  const _id = (this._id as mongoose.ObjectId).toString();
  console.log(_id);
  const token = JWT.sign({ _id }, process.env.JWT_PRIVATE_KEY!);

  this.tokens.push({ token });
  await this.save();
  return token;
};

UserSchema.methods.toJSON = function (this: InUserDoc) {
  const userObj = this.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

UserSchema.statics.findByCredital = async function (email: string, password: string) {
  const user = (await User.findOne({ email })) as InUserDoc;

  if (!user) {
    throw new CustomError('User not exist!', 400);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new CustomError('Invalid password', 400);
  }

  return user;
};

UserSchema.pre('save', async function (this: InUserDoc, next) {
  const salt = await bcrypt.genSalt(10);
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
export const User: InUserModel = mongoose.model<InUser, InUserModel>('User', UserSchema);
