
exports.up = function(knex, Promise) {
  return knex.schema.createTable('playerPositions', function(table) {
    table.increments('id').primary()
    table.string('map')
    table.string('player_guid')
    table.float('x')
    table.float('y')
    table.float('z')
    table.timestamps()

    // Index the map and player_guid
    table.index('map')
    table.index('player_guid')
  })
};

exports.down = function(knex, Promise) {

};
