import { UserModel } from '../../models/user';

const userModel = new UserModel();

describe('UserModel', () => {
  let createdUserId: number;

  // -----------------------------
  // INDEX
  // -----------------------------
  it('index should return an array of users', async () => {
    const result = await userModel.index();

    expect(Array.isArray(result)).toBeTrue();

    if (result.length > 0) {
      expect(result[0]).toEqual(
        jasmine.objectContaining({
          id: jasmine.any(Number),
          firstName: jasmine.any(String),
          lastName: jasmine.any(String),
        }),
      );
    }
  });

  // -----------------------------
  // CREATE
  // -----------------------------
  it('create should add a user', async () => {
    const result = await userModel.create({
      firstName: 'Test',
      lastName: 'Test',
      password: 'passwordTest',
    });

    createdUserId = result.id as number;

    expect(result).toEqual(
      jasmine.objectContaining({
        id: jasmine.any(Number),
        firstName: 'Test',
        lastName: 'Test',
      }),
    );
  });

  // -----------------------------
  // SHOW
  // -----------------------------
  it('show should return the correct user', async () => {
    const result = await userModel.show(String(createdUserId));

    expect(result).toEqual(
      jasmine.objectContaining({
        id: createdUserId,
        firstName: 'Test',
        lastName: 'Test',
      }),
    );
  });

  // -----------------------------
  // EDIT
  // -----------------------------
  it('edit should update a user', async () => {
    const result = await userModel.edit({
      id: createdUserId,
      firstName: 'Test22',
      lastName: 'Test',
      password: '',
    });

    expect(result).toEqual(
      jasmine.objectContaining({
        id: createdUserId,
        firstName: 'Test22',
        lastName: 'Test',
      }),
    );
  });

  // -----------------------------
  // DELETE
  // -----------------------------
  it('delete should remove a user', async () => {
    const result = await userModel.delete(String(createdUserId));

    expect(result).toEqual(
      jasmine.objectContaining({
        id: createdUserId,
      }),
    );
  });
});
