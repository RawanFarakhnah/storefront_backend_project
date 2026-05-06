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
    ('Laptop', 1200, 1),
    ('Smartphone', 800, 1),
    ('Headphones', 150, 1),

    ('Office Chair', 200, 2),
    ('Desk', 350, 2),
    ('Bookshelf', 180, 2),

    ('Novel Book', 25, 3),
    ('Notebook', 10, 3),
    ('Pen Set', 5, 3),

    ('T-Shirt', 30, 4),
    ('Jeans', 60, 4),
    ('Jacket', 120, 4);
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DELETE FROM products
    WHERE name IN (
      'Laptop','Smartphone','Headphones',
      'Office Chair','Desk','Bookshelf',
      'Novel Book','Notebook','Pen Set',
      'T-Shirt','Jeans','Jacket'
    );
  `);
};

exports._meta = {
  "version": 1
};
