var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
})

var bookshelf = require('bookshelf')(knex)

module.exports = bookshelf
