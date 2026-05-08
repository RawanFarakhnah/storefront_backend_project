import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
};

export type CreateOrEditUserDto = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD as string;

const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const sql = `SELECT id, firstName, lastName FROM users;`;
      const conn = await client.connect();
      const data = await conn.query(sql);
      conn.release();

      //Map users result
      const result = data.rows;
      return result.map((row) => ({
        id: row.id,
        firstName: row.firstname,
        lastName: row.lastname,
      }));
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT id, firstName, lastName FROM users WHERE id=($1);';
      const conn = await client.connect();
      const data = await conn.query(sql, [id]);
      conn.release();

      // Map user result
      const result = data.rows[0];
      return {
        id: result.id,
        firstName: result.firstname,
        lastName: result.lastname,
      };
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(input: CreateOrEditUserDto): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `
       INSERT INTO users (firstName, lastName, password_digest) 
       VALUES($1, $2, $3) 
       RETURNING *
      `;

      const hash = await bcrypt.hash(
        input.password + pepper,
        Number(saltRounds),
      );

      const data = await conn.query(sql, [
        input.firstName.trim(),
        input.lastName.trim(),
        hash,
      ]);
      conn.release();

      // Map user result
      const result = data.rows[0];
      return {
        id: result.id,
        firstName: result.firstname,
        lastName: result.lastname,
      };
    } catch (err) {
      throw new Error(`unable create user (${input.firstName}): ${err}`);
    }
  }

  async edit(input: CreateOrEditUserDto): Promise<User> {
    try {
      const conn = await client.connect();
      const fields: string[] = [];
      const values: (string | number)[] = [];
      let index = 1;

      // required fields
      fields.push(`firstName = $${index++}`);
      values.push(input.firstName.trim());

      fields.push(`lastName = $${index++}`);
      values.push(input.lastName.trim());

      // optional password
      if (input.password) {
        const hash = await bcrypt.hash(
          input.password + pepper,
          Number(saltRounds),
        );
        fields.push(`password_digest = $${index++}`);
        values.push(hash);
      }

      // id (required for WHERE)
      values.push(Number(input.id));

      const sql = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${index}
      RETURNING *;
     `;

      const data = await conn.query(sql, values);
      conn.release();

      // Map user result
      const result = data.rows[0];
      return {
        id: result.id,
        firstName: result.firstname,
        lastName: result.lastname,
      };
    } catch (err) {
      throw new Error(`Cannot update user ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = `DELETE FROM users
       WHERE id = $1
       RETURNING *;`;
      const conn = await client.connect();
      const data = await conn.query(sql, [id]);
      conn.release();

      // Map user result
      const result = data.rows[0];
      return {
        id: result.id,
        firstName: result.firstname,
        lastName: result.lastname,
      };
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
