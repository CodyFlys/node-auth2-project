exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments();
    tbl.string('userName', 12).notNullable()
    tbl.string('password', 32).notNullable()
    tbl.string('department', 64)
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};