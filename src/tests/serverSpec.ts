import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('API Endpoint Tests', () => {
  let token: string;

  let categoryId: number;
  let productId: number;

  // =========================
  // AUTH SETUP
  // =========================
  beforeAll(async () => {
    const response = await request.post('/users').send({
      firstName: 'Test',
      lastName: 'User',
      password: '1234',
    });

    expect(response.status).toBe(200);
    token = response.body.data;
  });

  // =========================
  // USER ENDPOINTS
  // =========================
  describe('User Endpoints', () => {
    it('POST /users should create user and return token', async () => {
      const response = await request.post('/users').send({
        firstName: 'John',
        lastName: 'Doe',
        password: '1234',
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('GET /users should fail without token', async () => {
      const response = await request.get('/users');

      expect(response.status).toBe(401);
    });

    it('GET /users should work with token', async () => {
      const response = await request
        .get('/users')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });

  // =========================
  // CATEGORY ENDPOINTS
  // =========================
  describe('Category Endpoints', () => {
    it('GET /categories should return all categories', async () => {
      const response = await request.get('/categories');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('POST /categories should fail without token', async () => {
      const response = await request.post('/categories').send({
        name: 'Electronics',
        description: 'Devices',
      });

      expect(response.status).toBe(401);
    });

    it('POST /categories should create category with token', async () => {
      const uniqueName = `Electronics-${Date.now()}`;

      const response = await request
        .post('/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: uniqueName,
          description: 'Devices',
        });

      expect(response.status).toBe(200);

      categoryId = response.body.data.id;
      expect(categoryId).toBeDefined();
    });

    it('GET /categories/:id should return category', async () => {
      const response = await request.get(`/categories/${categoryId}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(categoryId);
    });

    it('DELETE /categories/:id should delete category with token', async () => {
      const response = await request
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });

  // =========================
  // PRODUCT ENDPOINTS
  // =========================
  describe('Product Endpoints', () => {
    it('GET /products should return all products', async () => {
      const response = await request.get('/products');

      expect(response.status).toBe(200);
    });

    it('GET /products/top should return top products', async () => {
      const response = await request.get('/products/top');

      expect(response.status).toBe(200);
    });

    it('POST /products should create product with token', async () => {
      const response = await request
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Phone',
          price: 500,
          category: 'Electronics Test',
        });

      expect(response.status).toBe(200);

      productId = response.body.data.id;
      expect(productId).toBeDefined();
    });

    it('GET /products/:id should return product', async () => {
      const response = await request.get(`/products/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(productId);
    });

    it('DELETE /products/:id should delete product', async () => {
      const response = await request
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });

  // =========================
  // ORDER ENDPOINTS
  // =========================
  describe('Order Endpoints', () => {
    it('GET /orders should fail without token', async () => {
      const response = await request.get('/orders');

      expect(response.status).toBe(401);
    });

    it('GET /orders should work with token', async () => {
      const response = await request
        .get('/orders')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });

    it('GET /orders/current/:userId should return orders', async () => {
      const response = await request
        .get('/orders/current/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });

    it('GET /orders/completed/:userId should return completed orders', async () => {
      const response = await request
        .get('/orders/completed/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });
});
