import { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const userModel = new UserModel();
const tokenSecret = process.env.TOKEN_SECRET as string;

// Use signin USER -  method authenticate
export const signIn = async (req: Request, res: Response) => {
  const input: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  const password = req.body.password as string;

  try {
    const authorizedUser = await userModel.authenticate(input, password);
    if (!authorizedUser) {
      return res.status(401).json({ error: 'Invalid name or password.' });
    }

    // Create JWT Auth
    let token = jwt.sign({ user: authorizedUser }, tokenSecret);

    res.json({ message: `User signed in successfully.`, token: `${token}` });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
