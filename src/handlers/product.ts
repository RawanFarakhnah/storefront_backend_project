import { ProductModel, Product } from '../models/product';
import { Request, Response } from 'express';

const productModel = new ProductModel();

//Get All Product - INDEX method
export const index = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    res.json({ data: products });
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
    res.json({ data: product });
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
    res.json({ data: newProduct });
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
    res.json({ data: product });
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
    res.json({ data: deleted });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//All Products - Filter By Category method
export const getByCategory = async (req: Request, res: Response) => {
  try {
    const name = req.params.name as string;
    const result = await productModel.getByCategoryName(name);
    res.json({ data: result });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Top 5 Products - Filter By Popular Products
export const getMostPopularProducts = async (_req: Request, res: Response) => {
  try {
    const result = await productModel.getTopProducts();
    res.json({ data: result });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
