
exports.up = function(knex, Promise) {

    return knex.schema.table('playerMedicalStatuses', function(table) {
        table.text('ace_medical_medicalLogs')
        table.text('ace_medical_logFile_activity')
        table.text('ace_medical_logFile_activity_view')
    })

};

exports.down = function(knex, Promise) {
  
};
