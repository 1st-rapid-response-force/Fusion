/*
  Redeem the stored position of the Player as stored in the Database.

  Takes the server and player GUID as arguments so that it can correctly support multi home persistence.
*/
var ServerStore = require('../../../datastores/ServerMemory'),
  Position = require('../../../datastores/models/Position')

module.exports = function(arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      playerID
    ]
  */

  var serverID = arguments[0],
    playerID = arguments[1]

  // Load the server information from the server store
  var map = ServerStore.retrieve(serverID).map

  // Load the player position from the datastore
  var query = Position.query({
    where: {
      player_guid: playerID,
      map: map
    }
  }).fetch({
    require: true
  })

  var retriever = query
    .then(function(result) {

      // Return the result to the game engine
      return [result.get('x'), result.get('y'), result.get('z')]

    })
    .catch(Position.NotFoundError, function() {

      // Failed to retrieve position so return false to signal to the server
      return false

    })

  return retriever
}
