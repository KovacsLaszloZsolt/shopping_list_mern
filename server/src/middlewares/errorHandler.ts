import { NextFunction, Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { CustomError } from '../models/customErrorModel';

const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  if (err) {
    const error = err as Error;
    if (error.name === 'MongoServerError') {
      const mongoServerError = error as MongoServerError;
      if (mongoServerError.code === 11000) {
        res.status(400).json({ error: `${Object.keys(mongoServerError.keyPattern)[0]} is already used` });
        return;
      }
    }

    if (error.name === 'JsonWebTokenError') {
      res.status(400).json({ error: 'Invalid token' });
      return;
    }
  }

  console.log(err);
  res.status(500).send();
};

export default errorHandler;
