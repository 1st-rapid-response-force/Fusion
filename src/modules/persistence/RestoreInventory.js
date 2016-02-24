/*
  Retrieve the serialized inventory of the unit from the datastore
*/
var ServerStore = require('../../datastores/ServerMemory'),
  Inventory = require('../../datastores/models/Inventory')

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

  // Retrieve the map information
  var server = ServerStore.retrieve(serverID),
    map = server.map

  // Check if the user already has an inventory saved in the database
  var query = Inventory.query({
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
      return result.get('inventory')

    })
    .catch(Position.NotFoundError, function() {

      // Failed to retrieve the position, return [0,0,0] so the game server can
      // correctly init the player
      return false

    })

  return retriever



}
