'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    return db.runSql(`
    INSERT INTO products (name, price, category_id) VALUES

    -- Electronics
    ('Laptop', 1200, 1),
    ('Smartphone', 800, 1),
    ('Headphones', 150, 1),
    ('Monitor', 300, 1),
    ('Keyboard', 90, 1),

    -- Furniture
    ('Desk', 400, 2),
    ('Chair', 180, 2),
    ('Bookshelf', 250, 2),
    ('Sofa', 900, 2),
    ('Table', 350, 2),

    -- Books
    ('Novel', 25, 3),
    ('Notebook', 12, 3),
    ('Dictionary', 40, 3),
    ('Science Book', 55, 3),
    ('History Book', 35, 3),

    -- Clothing
    ('T-Shirt', 30, 4),
    ('Jeans', 70, 4),
    ('Jacket', 120, 4),
    ('Sneakers', 110, 4),
    ('Hat', 25, 4),

    -- Sports
    ('Football', 50, 5),
    ('Basketball', 45, 5),
    ('Tennis Racket', 140, 5),
    ('Yoga Mat', 35, 5),
    ('Dumbbells', 80, 5),

    -- Beauty
    ('Perfume', 95, 6),
    ('Lipstick', 22, 6),
    ('Face Cream', 40, 6),
    ('Shampoo', 18, 6),
    ('Conditioner', 20, 6),

    -- Toys
    ('Toy Car', 15, 7),
    ('Puzzle', 20, 7),
    ('Doll', 25, 7),
    ('Board Game', 45, 7),
    ('Lego Set', 80, 7),

    -- Kitchen
    ('Blender', 110, 8),
    ('Knife Set', 60, 8),
    ('Microwave', 250, 8),
    ('Coffee Maker', 140, 8),
    ('Pan Set', 95, 8),

    -- Automotive
    ('Car Vacuum', 75, 9),
    ('Seat Cover', 55, 9),
    ('GPS', 220, 9),
    ('Car Charger', 18, 9),
    ('Dash Camera', 160, 9),

    -- Health
    ('Vitamins', 35, 10),
    ('Protein Powder', 90, 10),
    ('First Aid Kit', 45, 10),
    ('Thermometer', 20, 10),
    ('Water Bottle', 18, 10);
  `);
};

exports.down = function(db) {
 return db.runSql(`
    DELETE FROM products;
  `);
};

exports._meta = {
  "version": 1
};
