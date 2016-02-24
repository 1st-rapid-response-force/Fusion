var bookshelf = require('../Postgre')

var Inventory = bookshelf.Model.extend({
  tableName: 'inventories'
})

module.exports = Inventory
