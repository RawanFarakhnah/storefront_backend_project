import client from '../database';
import { mapOrderRows } from '../utils/orderMapper';

export type Order = {
  id?: number;
  status: 'active' | 'complete';
  user_id: number;
  full_name: string;
  products: {
    id?: number;
    name: string;
    price: number;
    quantity: number;
  }[];
};
export class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const sql = `
        SELECT 
          o.id AS order_id,
          o.status,
          o.user_id,
          CONCAT(u.firstname, ' ', u.lastname) AS full_name,
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

      if (result.rows.length === 0) {
        return [];
      }

      return mapOrderRows(result.rows);
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async getCurrentByUserId(userId: number): Promise<Order | null> {
    try {
      const sql = `
        SELECT 
          o.id AS order_id,
          o.status,
          o.user_id,
          CONCAT(u.firstname, ' ', u.lastname) AS full_name,
          p.id AS product_id,
          p.name,
          p.price,
          op.quantity
        FROM orders o
        JOIN users u ON u.id = o.user_id
        JOIN orders_products op ON op.order_id = o.id
        JOIN products p ON p.id = op.product_id
        WHERE o.id = (
         SELECT id FROM orders
         WHERE status = 'active'
           AND user_id = $1
         ORDER BY created_at DESC
         LIMIT 1
       );`;

      const conn = await client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();

      if (result.rows.length === 0) {
        return null;
      }

      return mapOrderRows(result.rows)[0] ?? null;
    } catch (err) {
      throw new Error(`Could not get current order. Error: ${err}`);
    }
  }

  async getCompletedByUserId(userId: number): Promise<Order[]> {
    try {
      const sql = `
        SELECT 
          o.id AS order_id,
          o.status,
          o.user_id,
          CONCAT(u.firstname, ' ', u.lastname) AS full_name,
          p.id AS product_id,
          p.name,
          p.price,
          op.quantity
        FROM orders o
        JOIN users u ON u.id = o.user_id
        JOIN orders_products op ON op.order_id = o.id
        JOIN products p ON p.id = op.product_id
        WHERE o.id = (
         SELECT id FROM orders
         WHERE status = 'active'
           AND user_id = $1
         ORDER BY created_at DESC);
      `;

      const conn = await client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();

      if (result.rows.length === 0) {
        return [];
      }

      return mapOrderRows(result.rows);
    } catch (err) {
      throw new Error(`Could not get complete order. Error: ${err}`);
    }
  }
}
