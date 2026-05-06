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
}
