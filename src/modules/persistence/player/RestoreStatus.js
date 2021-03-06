/*
  Restore the Player Status of a provided player
*/
var ServerStore = require('../../../datastores/ServerMemory'),
  PlayerStatus = require('../../../datastores/models/PlayerStatus')

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
  var query = PlayerStatus.query({
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
      return [
        result.get('medical_status'),
        result.get('sw_radio_channels'),
        result.get('lr_radio_channels')
      ]
      
    })
    .catch(PlayerStatus.NotFoundError, function() {

      // Return false if not found so the server can correctly handle it
      return JSON.parse('[[0,0,100,[0,0,0,0,0,0],[],[],[],1,80,[],[80,120],100,[],0,[],0,0,0,[0,0,0,0,0,0],100,"false","false","false",0,"false","false",[],[],[]], [], []]')

    })

  return retriever



}
