/**
  Register a server with Fusion.

  Provides a Server Name and Map Name
**/
var winston = require('winston'),
  Promise = require('bluebird'),
  ServerStore = require('../../datastores/ServerMemory')

var registerServer = function (arguments) {

  var name = arguments[0][1],
    map = arguments[1][1]

  var index_id = ServerStore.register(name, map)
  winston.info('New server initialized - ' + name + " running " + map)

  return Promise.resolve(index_id)
}

module.exports = registerServer
