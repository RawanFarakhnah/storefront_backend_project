import client from '../database';

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password_digest: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT id, firstName, lastName FROM users;';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT id, firstName, lastName FROM users WHERE id=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  // Registe NEW user
  async create(input: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `
       INSERT INTO users (firstName, lastName, password_digest) 
       VALUES($1, $2, $3) 
       RETURNING *
      `;

      const result = await conn.query(sql, [
        input.firstName.trim(),
        input.lastName.trim(),
        input.password_digest,
      ]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${input.firstName}): ${err}`);
    }
  }
}
