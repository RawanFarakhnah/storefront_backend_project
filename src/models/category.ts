import client from '../database';

export type Category = {
  id?: number;
  name: string;
  description: string;
};

// CRUD methods
export class CategoryModel {
  async index(): Promise<Category[]> {
    try {
      const sql = 'SELECT * FROM categories;';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get categories. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Category> {
    try {
      const sql = 'SELECT * FROM categories WHERE id=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find category ${id}. Error: ${err}`);
    }
  }

  async create(input: Category): Promise<Category> {
    try {
      const normalized = input.name
        .trim()
        .toLowerCase()
        .replace(/^./, (c) => c.toUpperCase());

      const sql =
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;';
      const conn = await client.connect();
      const result = await conn.query(sql, [normalized, input.description]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new category ${input.name}. Error: ${err}`,
      );
    }
  }

  async edit(input: Category): Promise<Category> {
    try {
      const normalized = input.name
        .trim()
        .toLowerCase()
        .replace(/^./, (c) => c.toUpperCase());

      const sql = `
        UPDATE categories SET
          name = $1, 
          description = $2
        WHERE id = $3 RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [
        normalized,
        input.description,
        input.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update category ${err}`);
    }
  }

  async delete(id: string): Promise<Category> {
    try {
      const sql = `DELETE FROM categories
       WHERE id = $1
       RETURNING *;`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete category ${id}. Error: ${err}`);
    }
  }
}
