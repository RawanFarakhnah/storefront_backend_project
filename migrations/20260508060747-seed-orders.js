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
    INSERT INTO orders (status, user_id, created_at) VALUES

    ('active', 1, NOW()),
    ('complete', 1, NOW()),
    ('complete', 1, NOW()),
    ('complete', 1, NOW()),

    ('active', 2, NOW()),
    ('complete', 2, NOW()),
    ('complete', 2, NOW()),

    ('active', 3, NOW()),
    ('complete', 3, NOW()),
    ('complete', 3, NOW()),
    ('complete', 3, NOW()),
    ('complete', 3, NOW()),

    ('active', 4, NOW()),
    ('complete', 4, NOW()),
    ('complete', 4, NOW()),

    ('active', 5, NOW()),
    ('complete', 5, NOW()),
    ('complete', 5, NOW()),
    ('complete', 5, NOW()),

    ('active', 6, NOW()),
    ('complete', 6, NOW()),
    ('complete', 6, NOW());
  `);
};

exports.down = function(db) {
   return db.runSql(`
    DELETE FROM orders;
  `);
};

exports._meta = {
  "version": 1
};
