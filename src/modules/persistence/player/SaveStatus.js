/*
  Persist the serialized information that is saved in addition to any player
*/
var ServerStore = require('../../../datastores/ServerMemory'),
  PlayerStatus = require('../../../datastores/models/PlayerStatus')

module.exports = function(arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      playerID,
      medicalString,
      shortRadioFrequencies,
      longRadioFrequencies
    ]
  */
  var serverID = arguments[0],
    playerID = arguments[1],
    medicalInformation = JSON.stringify(arguments[2]),
    shortRangeInformation = JSON.stringify(arguments[3]),
    longRangeInformation = JSON.stringify(arguments[4])

  // Retrieve the map information
  var server = ServerStore.retrieve(serverID),
    map = server.map

  // Check if the user already has an inventory saved in the database
  var query = PlayerStatus.query({
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
        medical_status: medicalInformation,
        sw_radio_channels: shortRangeInformation,
        lr_radio_channels: longRangeInformation,
        updated_at: new Date()
      })

      return result.save()
    })
    .catch(PlayerStatus.NotFoundError, function() {

      // Build a new Inventory
      var new_player_status = new PlayerStatus({
        player_guid: playerID,
        map: map,
        medical_status: medicalInformation,
        sw_radio_channels: shortRangeInformation,
        lr_radio_channels: longRangeInformation,
        updated_at: new Date(),
        created_at: new Date()
      })

      return new_player_status.save()
    }).then(function(saved_status) {
      return true
    })

  return updater

}
