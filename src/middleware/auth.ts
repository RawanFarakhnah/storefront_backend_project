// middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ message: 'Access denied, token missing' });
      return;
    }

    const token = authorizationHeader.split(' ')[1] as string;

    jwt.verify(token, tokenSecret);

    next(); // continue to handlers
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err });
  }
};

export default verifyAuthToken;
