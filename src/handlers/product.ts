import { ProductModel, Product } from '../models/product';
import { Request, Response } from 'express';

const productModel = new ProductModel();

//Get All Product - INDEX method
export const index = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    res.json({ msg: 'this is the INDEX route', items: products });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Get One Product - SHOW method
export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await productModel.show(id);
    res.json({ msg: 'this is the SHOW route', item: product });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Create Product - CREATE method
export const create = async (req: Request, res: Response) => {
  try {
    const input: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await productModel.create(input);
    res.json({ msg: 'this is the CREATE route', items: newProduct });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Update Product - EDIT method
export const update = async (req: Request, res: Response) => {
  try {
    const input: Product = {
      id: Number(req.params.id),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const product = await productModel.edit(input);
    res.json({ msg: 'this is the EDIT route', items: product });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Delete Product - DELETE method
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await productModel.delete(id);
    res.json({ msg: 'this is the DELETE route', items: deleted });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
