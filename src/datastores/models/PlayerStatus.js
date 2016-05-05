var bookshelf = require('../Postgre')

var Inventory = bookshelf.Model.extend({
  tableName: 'playerStatuses'
})

module.exports = Inventory
