/**
  Logs a player death to the analytics platform
**/
var winston = require('winston'),
  Promise = require('bluebird'),
  Servers = require('../../datastores/ServerMemory'),
  Keen = require('../../datastores/Keen')

module.exports = function(arguments) {

  // Process the provided information
  var playerID = arguments[1][0][1],
    serverID = arguments[0]

  // Lookup map information
  var server = Servers.retrieve(serverID)

  // Fabricate a Keen Event for tracking
  var playerDeathEvent = {
    playerID: playerID,
    map: server.map,
    name: server.name,
    keen: {
      timestamp: new Date().toISOString()
    }
  }

  // Send the event to Keen and return true to the calling function
  Keen.addEvent('deaths', playerDeathEvent)

  Promise.resolve(true)

}
