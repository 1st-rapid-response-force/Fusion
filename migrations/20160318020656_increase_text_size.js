
exports.up = function(knex, Promise) {
  return knex.schema.table('playerInventories', function(table) {
    table.dropColumn('inventory')
  })
};

exports.down = function(knex, Promise) {

};
