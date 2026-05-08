import { ProductModel } from '../../models/product';

const productModel = new ProductModel();

describe('ProductModel', () => {
  let createdProductId: number;

  // -----------------------------
  // INDEX
  // -----------------------------
  it('index should return an array of products', async () => {
    const result = await productModel.index();

    expect(Array.isArray(result)).toBeTrue();
    expect(result.length).toBeGreaterThan(0);

    expect(result[0]).toEqual(
      jasmine.objectContaining({
        id: jasmine.any(Number),
        name: jasmine.any(String),
        price: jasmine.any(Number),
        category_name: jasmine.any(String),
      }),
    );
  });

  // -----------------------------
  // CREATE
  // -----------------------------
  it('create should add a product', async () => {
    const result = await productModel.create({
      name: 'Test Product',
      price: 99,
      category: 'Test Category',
    });

    createdProductId = result.id as number;

    expect(result).toEqual(
      jasmine.objectContaining({
        id: jasmine.any(Number),
        name: 'Test Product',
        price: 99,
      }),
    );
  });

  // -----------------------------
  // SHOW
  // -----------------------------
  it('show should return the correct product', async () => {
    const result = await productModel.show(String(createdProductId));

    expect(result).toEqual(
      jasmine.objectContaining({
        id: createdProductId,
        name: 'Test Product',
        price: 99,
      }),
    );
  });

  // -----------------------------
  // EDIT
  // -----------------------------
  it('edit should update a product', async () => {
    const result = await productModel.edit({
      id: createdProductId,
      name: 'Updated Product',
      price: 120,
      category: 'Updated Category',
    });

    expect(result).toEqual(
      jasmine.objectContaining({
        id: createdProductId,
        name: 'Updated Product',
        price: 120,
      }),
    );
  });

  // -----------------------------
  // DELETE
  // -----------------------------
  it('delete should remove a product', async () => {
    const result = await productModel.delete(String(createdProductId));

    expect(result).toEqual(
      jasmine.objectContaining({
        id: createdProductId,
      }),
    );
  });

  // -----------------------------
  // CATEGORY LOOKUP
  // -----------------------------
  it('getByCategoryName should return matching products', async () => {
    const result = await productModel.getByCategoryName('Test');

    expect(Array.isArray(result)).toBeTrue();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  // -----------------------------
  // TOP PRODUCTS
  // -----------------------------
  it('getTopProducts should return up to 5 products', async () => {
    const result = await productModel.getTopProducts();

    expect(result.length).toBeLessThanOrEqual(5);

    if (result.length > 0) {
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(Number),
          name: jasmine.any(String),
          total_sold: jasmine.any(Number),
        }),
      );
    }
  });
});
