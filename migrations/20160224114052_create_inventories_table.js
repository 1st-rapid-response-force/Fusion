
exports.up = function(knex, Promise) {
  return knex.schema.createTable('inventories', function(table) {
    table.increments()
    table.string('map')
    table.string('player_guid')
    table.string('inventory')
    table.timestamps()

    // Index the map and player_guid
    table.index('map')
    table.index('player_guid')
  })
};

exports.down = function(knex, Promise) {

};
