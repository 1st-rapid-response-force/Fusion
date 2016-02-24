/*
  Persist the passed position of the unit to the datastore.
*/
var ServerStore = require('../../datastores/ServerMemory'),
  Position = require('../../datastores/models/Position')

module.exports = function(arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      playerID,
      position[x, y, z]
    ]
  */
  var serverID = arguments[0],
    position = arguments[2],
    playerID = arguments[1]

  // Retrieve the map information
  var server = ServerStore.retrieve(serverID),
    map = server.map

  // Query the database to find out if we already have a stored position for this
  //  user on this particular map
  var query = Position.query({
    where: {
      player_guid: playerID,
      map: map
    }
  }).fetch({
    require: true
  })

  var updater = query
    .then(function(result) {
      // Result existed so we need to update it
      result.set({
        x: position[0],
        y: position[1],
        z: position[2],
        updated_at: Date.now()
      })

      return result.save()
    })
    .catch(Position.NotFoundError, function() {

      // Build a new Position
      var new_position = new Position({
        player_guid: playerID,
        map: map,
        x: position[0],
        y: position[1],
        z: position[2],
        updated_at: Date.now(),
        created_at: Date.now()
      })

      return new_position.save()
    }).then(function(saved_position) {
      return true
    })

  return updater
}
