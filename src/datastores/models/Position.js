var bookshelf = require('../Postgre')

var Position = bookshelf.Model.extend({
  tableName: 'positions'
})

module.exports = Position
