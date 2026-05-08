import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  //Index - API Endpoint
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

  //Show - API Endpoint
  async show(id: string): Promise<Product> {
    try {
      const sql = `
        SELECT 
          p.*,
          c.name AS category_name
        FROM products p
        JOIN categories c ON c.id = p.category_id
        WHERE p.id = $1;
      `;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }

  //[OPTIONAL] Products by category :- API Endpoint
  async getByCategoryName(name: string): Promise<Product[]> {
    try {
      const sql = `
        SELECT 
          p.*,
          c.name AS category_name
        FROM products p
        JOIN categories c 
          ON c.id = p.category_id
        WHERE c.name ILIKE $1;
      `;
      const conn = await client.connect();
      const result = await conn.query(sql, [`%${name}%`]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find specific product with category ${name}. Error: ${err}`,
      );
    }
  }

  //[OPTIONAL] Top 5 Products - Get By Popular Products
  async getTopProducts(): Promise<Product[]> {
    try {
      const sql = `
        SELECT 
          p.id,
          p.name,
          p.price,
          c.name AS category,
          SUM(op.quantity) AS total_sold
        FROM orders_products op
        JOIN products p ON p.id = op.product_id
        JOIN categories c ON c.id = p.category_id
        GROUP BY p.id, c.name
        ORDER BY total_sold DESC
        LIMIT 5;
      `;

      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();

      //Mapping Data
      return result.rows.map((row) => ({
        id: Number(row.id),
        name: row.name,
        price: Number(row.price),
        category: row.category,
        total_sold: Number(row.total_sold),
      }));
    } catch (err) {
      throw new Error(`Could not find top 5 products. Error: ${err}`);
    }
  }

  async getOrCreateCategoryId(name: string): Promise<number> {
    const normalized = name
      .trim()
      .toLowerCase()
      .replace(/^./, (c) => c.toUpperCase());

    const sql = `
    INSERT INTO categories (name)
    VALUES ($1)
    ON CONFLICT (name)
    DO UPDATE SET name = categories.name
    RETURNING id;
  `;

    const conn = await client.connect();
    const result = await conn.query(sql, [normalized]);
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
