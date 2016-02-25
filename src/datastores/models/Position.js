var bookshelf = require('../Postgre')

var Position = bookshelf.Model.extend({
  tableName: 'playerPositions'
})

module.exports = Position
