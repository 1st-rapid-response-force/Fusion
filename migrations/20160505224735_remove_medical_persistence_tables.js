
exports.up = function(knex, Promise) {

  return knex.schema.dropTable("playerMedicalStatuses")

};

exports.down = function(knex, Promise) {

};
