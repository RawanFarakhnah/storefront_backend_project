import { Request, Response } from 'express';
import { CreateOrEditUserDto, UserModel } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const userModel = new UserModel();
const tokenSecret = process.env.TOKEN_SECRET as string;

//Get All Users - INDEX method
export const index = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    res.json({ data: users });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Get One User - SHOW method
export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await userModel.show(id);
    res.json({ data: result });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Create User - CREATE method
export const create = async (req: Request, res: Response) => {
  const input: CreateOrEditUserDto = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  try {
    const newUser = await userModel.create(input);
    let token = jwt.sign({ user: newUser }, tokenSecret);
    res.json({
      message: `User created in successfully.`,
      token: `${token}`,
      data: newUser,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Update User - EDIT method
export const update = async (req: Request, res: Response) => {
  const input: CreateOrEditUserDto = {
    id: Number(req.params.id),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  // try {
  //   const authorizationHeader = req.headers.authorization as string;
  //   const token = authorizationHeader.split(' ')[1] as string;
  //   const decoded = jwt.verify(token, tokenSecret);
  //   if (decoded.id !== input.id) {
  //     throw new Error('User id does not match!');
  //   }
  // } catch (err) {
  //   res.status(401);
  //   res.json(err);
  //   return;
  // }

  try {
    const result = await userModel.edit(input);
    res.json({ data: result });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Delete USER - DELETE method
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await userModel.delete(id);
    res.json({ data: deleted });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
