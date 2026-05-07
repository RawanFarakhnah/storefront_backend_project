import { Request, Response } from 'express';
import { OrderModel } from '../models/order';

const orderModel = new OrderModel();

//Get All Order - INDEX method
export const index = async (_req: Request, res: Response) => {
  try {
    const orders = await orderModel.index();
    res.json({ data: orders });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//One Order - Filter by user Id
export const getCurrentByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await orderModel.getCurrentByUserId(Number(userId));
    res.json({ data: orders });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//All Orders - Filter by user Id
export const getCompletedByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await orderModel.getCompletedByUserId(Number(userId));
    res.json({ data: orders });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
