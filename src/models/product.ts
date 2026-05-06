import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const sql = `
        SELECT 
          p.*,
          c.name AS category_name
        FROM products p
        JOIN categories c ON c.id = p.category_id;
      `;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = `
        SELECT 
          p.*,
          c.name AS category_name
        FROM products p
        JOIN categories c ON c.id = p.category_id
        WHERE id = $1;
      `;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }

  async getOrCreateCategoryId(name: string): Promise<number> {
    const sql = `INSERT INTO categories (name)
     VALUES ($1)
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
     RETURNING id;`;
    const conn = await client.connect();
    const result = await conn.query(sql, [name.toLowerCase()]);
    conn.release();
    return result.rows[0].id;
  }

  async create(input: Product): Promise<Product> {
    let category_id: number | null = null;

    if (input.category) {
      category_id = await this.getOrCreateCategoryId(input.category);
    }

    try {
      const sql = `INSERT INTO products (name, price, category_id)
       VALUES ($1, $2, $3)
       RETURNING *;`;

      const conn = await client.connect();
      const result = await conn.query(sql, [
        input.name,
        input.price,
        category_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new Product ${input.name}. Error: ${err}`);
    }
  }

  async edit(input: Product): Promise<Product> {
    let category_id: number | null = null;

    if (input.category) {
      category_id = await this.getOrCreateCategoryId(input.category);
    }

    try {
      const sql = `UPDATE products
       SET name = $1,
           price = $2,
           category_id = $3
       WHERE id = $4
       RETURNING *;`;

      const conn = await client.connect();
      const result = await conn.query(sql, [
        input.name,
        input.price,
        category_id,
        input.id as number,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update product ${input.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = `DELETE FROM products
       WHERE id = $1
       RETURNING *;`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const Product = result.rows[0];
      conn.release();

      return Product;
    } catch (err) {
      throw new Error(`Could not delete Product ${id}. Error: ${err}`);
    }
  }
}
