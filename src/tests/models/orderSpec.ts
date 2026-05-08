// -----------------------------
// ORDER MODEL SPECS
// -----------------------------

import { OrderModel } from '../../models/order';

const orderModel = new OrderModel();

describe('OrderModel', () => {
  // -----------------------------
  // INDEX
  // -----------------------------
  it('index should return an array of orders', async () => {
    const result = await orderModel.index();

    expect(Array.isArray(result)).toBeTrue();

    if (result.length > 0) {
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(Number),
          status: jasmine.any(String),
          user_id: jasmine.any(Number),
          full_name: jasmine.any(String),
          products: jasmine.any(Array),
        }),
      );
    }
  });

  // -----------------------------
  // CURRENT ORDER BY USER
  // -----------------------------
  it('getCurrentByUserId should return current active order or null', async () => {
    const result = await orderModel.getCurrentByUserId(1);

    if (result) {
      expect(result).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(Number),
          status: jasmine.any(String),
          user_id: jasmine.any(Number),
          full_name: jasmine.any(String),
          products: jasmine.any(Array),
        }),
      );

      const product = result.products[0];
      if (product) {
        expect(product).toEqual(
          jasmine.objectContaining({
            id: jasmine.any(Number),
            name: jasmine.any(String),
            price: jasmine.any(Number),
            quantity: jasmine.any(Number),
          }),
        );
      }
    } else {
      expect(result).toBeNull();
    }
  });

  // -----------------------------
  // COMPLETED ORDERS
  // -----------------------------
  it('getCompletedByUserId should return completed orders', async () => {
    const result = await orderModel.getCompletedByUserId(1);

    expect(Array.isArray(result)).toBeTrue();

    if (result.length > 0) {
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(Number),
          status: 'complete',
          user_id: jasmine.any(Number),
          full_name: jasmine.any(String),
          products: jasmine.any(Array),
        }),
      );

      const product = result[0]?.products[0];
      if (product) {
        expect(product).toEqual(
          jasmine.objectContaining({
            id: jasmine.any(Number),
            name: jasmine.any(String),
            price: jasmine.any(Number),
            quantity: jasmine.any(Number),
          }),
        );
      }
    }
  });
});
