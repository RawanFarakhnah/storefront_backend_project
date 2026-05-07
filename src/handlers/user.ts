import { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import bcrypt from 'bcrypt';

const userModel = new UserModel();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

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
    const password: string = req.body.password;
    const hash = await bcrypt.hash(
      password + BCRYPT_PASSWORD,
      Number(SALT_ROUNDS),
    );

    const input: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password_digest: hash,
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
    const password: string = req.body.password;
    const hash = await bcrypt.hash(
      password + BCRYPT_PASSWORD,
      Number(SALT_ROUNDS),
    );

    const input: User = {
      id: Number(req.params.id),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password_digest: hash,
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
- TODO: Add Test For All CRUD Methods [required]
*/
