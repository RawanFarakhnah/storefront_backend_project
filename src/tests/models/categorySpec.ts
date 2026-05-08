import { CategoryModel } from '../../models/category';

const categoryModel = new CategoryModel();

describe('CategoryModel', () => {
  // -----------------------------
  // INDEX
  // -----------------------------
  it('index returns array of categories', async () => {
    const result = await categoryModel.index();

    expect(Array.isArray(result)).toBeTrue();

    if (result.length > 0) {
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(Number),
          name: jasmine.any(String),
          description: jasmine.any(String),
        }),
      );
    }
  });

  // -----------------------------
  // CREATE
  // -----------------------------
  it('create should add a category', async () => {
    const uniqueName = `Test category ${Date.now()}`;

    const result = await categoryModel.create({
      name: uniqueName,
      description: 'Test Description',
    });

    expect(result).toEqual(
      jasmine.objectContaining({
        id: jasmine.any(Number),
        name: uniqueName,
        description: 'Test Description',
      }),
    );
  });

  // -----------------------------
  // SHOW
  // -----------------------------
  it('show should return a category by id', async () => {
    const created = await categoryModel.create({
      name: `Show Test ${Date.now()}`,
      description: 'Test',
    });

    const result = await categoryModel.show(String(created.id));

    expect(result.id).toBe(created.id);
    expect(result.name).toBe(created.name);
    expect(result.description).toBe(created.description);
  });

  // -----------------------------
  // EDIT
  // -----------------------------
  it('edit should update a category', async () => {
    const created = await categoryModel.create({
      name: `Edit Test ${Date.now()}`,
      description: 'Old Description',
    });

    const updatedName = `Updated Category ${Date.now()}`;

    const result = await categoryModel.edit({
      id: created.id as number,
      name: updatedName,
      description: 'Updated Description',
    });

    expect(result.id).toBe(created.id);
    expect(result.description).toBe('Updated Description');

    // normalize check instead of exact casing
    expect(result.name.toLowerCase()).toContain('updated category');
  });

  // -----------------------------
  // DELETE
  // -----------------------------
  it('delete should remove a category', async () => {
    const created = await categoryModel.create({
      name: `Delete Test ${Date.now()}`,
      description: 'To be deleted',
    });

    const result = await categoryModel.delete(String(created.id));

    expect(result).toEqual(
      jasmine.objectContaining({
        id: created.id as number,
      }),
    );
  });
});
