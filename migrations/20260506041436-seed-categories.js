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
    ('Clothing', 'Fashion and apparel'),
    ('Sports', 'Sports equipment'),
    ('Beauty', 'Beauty and skincare'),
    ('Toys', 'Kids toys and games'),
    ('Kitchen', 'Kitchen tools and appliances'),
    ('Automotive', 'Vehicle accessories'),
    ('Health', 'Health and wellness');
  `);
};

exports.down = function(db) {
 return db.runSql(`
    DELETE FROM categories;
  `);
};

exports._meta = {
  "version": 1
};
