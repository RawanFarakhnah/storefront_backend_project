import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_PORT,
  ENV,
} = process.env;

let client: Pool = new Pool();

console.log('ENV:', ENV);

if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string, 10),
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string, 10),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
