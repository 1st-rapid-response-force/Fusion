
exports.up = function(knex, Promise) {

  return knex.schema.createTable('playerStatuses', function(table) {

    table.increments('id').primary()
    table.string('map')
    table.string('player_guid')
    table.text('medical_status')
    table.text('sw_radio_channels')
    table.text('lr_radio_channels')
    table.timestamps()

    // Index the map and player_guid
    table.index('map')
    table.index('player_guid')

  })

};

exports.down = function(knex, Promise) {

};
