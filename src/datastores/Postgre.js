var knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10
  }
})

var bookshelf = require('bookshelf')(knex)

module.exports = bookshelf
