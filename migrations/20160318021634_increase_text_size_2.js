
exports.up = function(knex, Promise) {
  return knex.schema.table('playerInventories', function(table) {
    table.text('inventory')
  })
};

exports.down = function(knex, Promise) {

};
