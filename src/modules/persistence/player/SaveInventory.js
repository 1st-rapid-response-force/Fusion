/*
  Persist the serialized inventory of the unit to the datastore.
*/
var ServerStore = require('../../../datastores/ServerMemory'),
  Inventory = require('../../../datastores/models/Inventory')

module.exports = function(arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      playerID,
      inventoryString
    ]
  */
  var serverID = arguments[0],
    playerID = arguments[1],
    inventoryString = JSON.stringify(arguments[2])

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

  var updater = query
    .then(function(result) {
      // Result existed so we need to update it
      result.set({
        inventory: inventoryString,
        updated_at: new Date()
      })

      return result.save()
    })
    .catch(Inventory.NotFoundError, function() {

      // Build a new Inventory
      var new_inventory = new Inventory({
        player_guid: playerID,
        map: map,
        inventory: inventoryString,
        updated_at: new Date(),
        created_at: new Date()
      })

      return new_inventory.save()
    }).then(function(saved_inventory) {
      return true
    })

  return updater

}
