var bookshelf = require('../Postgre')

var Inventory = bookshelf.Model.extend({
  tableName: 'playerInventories'
})

module.exports = Inventory
