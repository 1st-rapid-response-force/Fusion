var bookshelf = require('../Postgre')

var Inventory = bookshelf.Model.extend({
  tableName: 'playerMedicalStatuses'
})

module.exports = Inventory
