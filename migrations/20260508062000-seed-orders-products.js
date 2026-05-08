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
    INSERT INTO orders_products (order_id, product_id, quantity) VALUES

    -- USER 1
    (1, 1, 2),
    (1, 5, 1),
    (1, 10, 3),

    (2, 2, 4),
    (2, 7, 1),
    (2, 15, 2),

    (3, 1, 5),
    (3, 20, 2),
    (3, 25, 1),

    (4, 3, 2),
    (4, 8, 4),
    (4, 12, 1),

    -- USER 2
    (5, 1, 3),
    (5, 9, 2),
    (5, 18, 1),

    (6, 5, 4),
    (6, 10, 1),
    (6, 22, 2),

    (7, 2, 5),
    (7, 11, 3),
    (7, 30, 1),

    -- USER 3
    (8, 1, 2),
    (8, 14, 4),
    (8, 19, 1),

    (9, 6, 3),
    (9, 12, 2),
    (9, 21, 5),

    (10, 7, 1),
    (10, 15, 3),
    (10, 25, 2),

    (11, 3, 4),
    (11, 8, 1),
    (11, 16, 2),

    (12, 2, 5),
    (12, 9, 2),
    (12, 20, 1),

    -- USER 4
    (13, 1, 2),
    (13, 10, 3),
    (13, 17, 1),

    (14, 5, 4),
    (14, 11, 2),
    (14, 18, 1),

    (15, 6, 3),
    (15, 12, 1),
    (15, 22, 5),

    -- USER 5
    (16, 1, 5),
    (16, 7, 2),
    (16, 13, 1),

    (17, 2, 3),
    (17, 8, 4),
    (17, 19, 2),

    (18, 3, 1),
    (18, 9, 2),
    (18, 21, 5),

    (19, 4, 4),
    (19, 10, 3),
    (19, 25, 1),

    -- USER 6
    (20, 1, 2),
    (20, 11, 4),
    (20, 15, 1),

    (21, 5, 3),
    (21, 12, 2),
    (21, 18, 1),

    (22, 6, 5),
    (22, 14, 1),
    (22, 20, 2);
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DELETE FROM orders_products;
  `);
};

exports._meta = {
  "version": 1
};
