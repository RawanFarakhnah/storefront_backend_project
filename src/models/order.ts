import client from '../database';
import { mapOrderRows } from '../utils/orderMapper';

export type Order = {
  id?: number;
  status: 'active' | 'complete';
  user_id: number;
  username: string;
  products: {
    id?: number;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export type OrderFilterInput = {
  order_id?: number;
  product_id?: number;
  user_id?: number;
  order_status: string;
};

export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const sql = `
        SELECT 
          o.id AS order_id,
          o.status,
          o.user_id,
          CONCAT(u.firstname, ' ', u.lastname) AS username,
          p.id AS product_id,
          p.name,
          p.price,
          op.quantity
        FROM orders o
        JOIN users u ON u.id = o.user_id
        JOIN orders_products op ON op.order_id = o.id
        JOIN products p ON p.id = op.product_id
       `;

      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();

      return mapOrderRows(result.rows);
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
}
