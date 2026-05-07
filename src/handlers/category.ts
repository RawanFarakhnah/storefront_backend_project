import { Request, Response } from 'express';
import { Category, CategoryModel } from '../models/category';

const categoryModel = new CategoryModel();

//Get All Category - INDEX method
export const index = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryModel.index();
    res.json({ message: 'this is the INDEX route', data: categories });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Get One Category - SHOW method
export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const category = await categoryModel.show(id);
    res.json({ message: 'this is the SHOW route', data: category });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Create Category - CREATE method
export const create = async (req: Request, res: Response) => {
  try {
    const input: Category = {
      name: req.body.name,
      description: req.body.description,
    };
    const newProduct = await categoryModel.create(input);
    res.json({ message: 'this is the CREATE route', data: newProduct });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Update Category - EDIT method
export const update = async (req: Request, res: Response) => {
  try {
    const input: Category = {
      id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
    };
    const category = await categoryModel.edit(input);
    res.json({ message: 'this is the EDIT route', data: category });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Delete Category - DELETE method
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await categoryModel.delete(id);
    res.json({ message: 'this is the DELETE route', data: deleted });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//TODO: Add Test For All CRUD Methods [required]
