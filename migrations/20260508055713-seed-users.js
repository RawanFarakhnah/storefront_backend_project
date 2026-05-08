'use strict';
const bcrypt = require('bcrypt');

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

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

exports.up = async function(db) {
  const hash = await bcrypt.hash(
    'password123' + pepper,
    Number(saltRounds)
  );

  return db.runSql(`
    INSERT INTO users
    (firstName, lastName, password_digest)
    VALUES
    ('John', 'Doe', '${hash}'),
    ('Jane', 'Smith', '${hash}'),
    ('Michael', 'Johnson', '${hash}'),
    ('Sarah', 'Brown', '${hash}'),
    ('David', 'Wilson', '${hash}'),
    ('Emily', 'Davis', '${hash}');
  `);
};

exports.down = function(db) {
  return db.runSql(`
    DELETE FROM users;
  `);
};

exports._meta = {
  "version": 1
};
