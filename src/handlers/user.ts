import { Request, Response } from 'express';
import { CreateOrEditUserDto, UserModel } from '../models/user';

const userModel = new UserModel();

//Get All Users - INDEX method
export const index = async (_req: Request, res: Response) => {
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
  try {
    const input: CreateOrEditUserDto = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    const newUser = await userModel.create(input);
    res.json({ data: newUser });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Update User - EDIT method
export const update = async (req: Request, res: Response) => {
  try {
    const input: CreateOrEditUserDto = {
      id: Number(req.params.id),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    };

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

/**#### Users
- TODO: Index [token required]
- TODO: Show [token required] 
- TODO: Create N[token required]
*/
