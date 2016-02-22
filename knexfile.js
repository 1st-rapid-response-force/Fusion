var dotenv = require('dotenv')
dotenv.config()

module.exports = {

  production: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 7
    }
  }

};
