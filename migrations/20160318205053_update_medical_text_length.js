
exports.up = function(knex, Promise) {

    return knex.schema.table('playerMedicalStatuses', function(table) {
        table.dropColumn('ace_medical_medicalLogs')
        table.dropColumn('ace_medical_logFile_activity')
        table.dropColumn('ace_medical_logFile_activity_view')
    })

};

exports.down = function(knex, Promise) {
  
};
