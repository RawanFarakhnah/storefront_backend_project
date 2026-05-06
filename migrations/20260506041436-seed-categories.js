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
    INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Devices and gadgets'),
    ('Furniture', 'Home and office furniture'),
    ('Books', 'Printed and digital books'),
    ('Clothing', 'Apparel and fashion items');
  `);
};

exports.down = function(db) {
 return db.runSql(`
    DELETE FROM categories
    WHERE name IN ('Electronics', 'Furniture', 'Books', 'Clothing');
  `);
};

exports._meta = {
  "version": 1
};
