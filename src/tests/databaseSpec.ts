import client from '../database'; // or wherever your DB client is

describe('Database Connection', () => {
  it('should connect to the test database', async () => {
    const conn = await client.connect();
    const result = await conn.query('SELECT NOW()');
    conn.release();

    expect(result.rows.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await client.end();
  });
});
