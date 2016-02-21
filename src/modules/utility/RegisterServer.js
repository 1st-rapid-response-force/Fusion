/**
  Register a server with Fusion.

  Provides a Server Name and Map Name
**/
var winston = require('winston'),
  Promise = require('bluebird'),
  ServerStore = require('../../datastores/ServerMemory')

var registerServer = function (arguments) {

  var index_id = ServerStore.register(arguments.name, arguments.map)
  winston.info('New server initialized - ' + arguments.name + " running " + arguments.map)

  return Promise.resolve(index_id)
}

module.exports = registerServer
