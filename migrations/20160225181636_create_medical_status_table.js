
exports.up = function(knex, Promise) {

  return knex.schema.createTable('playerMedicalStatuses', function(table) {
    table.increments('id').primary()
    table.string('map')
    table.string('player_guid')

    // There are a shitload of medical options - carefully give each one a table so we are future proofed.
    table.string('ace_medical_pain')
    table.string('ace_medical_morphine')
    table.string('ace_medical_bloodvolume')
    table.string('ace_isunconscious')

    table.string('ace_medical_tourniquets')

    table.string('ace_medical_openwoods')
    table.string('ace_medical_bandagedwounds')
    table.string('ace_medical_internalwounds')
    table.string('ace_medical_lastuniquewoundid')

    table.string('ace_medical_heartrate')
    table.string('ace_medical_heartrateadjustments')
    table.string('ace_medical_bloodpressure')
    table.string('ace_medical_peripheralresistance')

    table.string('ace_medical_fractures')

    table.string('ace_medical_triagelevel')
    table.string('ace_medical_triagecard')

    table.string('ace_medical_salineivvolume')
    table.string('ace_medical_plasmaivvolume')
    table.string('ace_medical_bloodivvolume')

    table.string('ace_medical_bodypartstatus')

    table.string('ace_medical_airwaystatus')
    table.string('ace_medical_airwayoccluded')
    table.string('ace_medical_airwaycollapsed')

    table.string('ace_medical_incardiacarrest')
    table.string('ace_medical_haslostblood')
    table.string('ace_medical_isbleeding')
    table.string('ace_medical_haspain')

    table.string('ace_medical_medicalLogs')
    table.string('ace_medical_logFile_activity')
    table.string('ace_medical_logFile_activity_view')

    table.timestamps()

    // Index the map and player_guid
    table.index('map')
    table.index('player_guid')
  })

}

exports.down = function(knex, Promise) {

}
