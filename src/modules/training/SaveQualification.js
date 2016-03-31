/*
  Store a range score to Catalyst
*/
var ServerStore = require('../../datastores/ServerMemory'),
  popsicle = require('popsicle'),
  bluebird = require('bluebird')

module.exports = function(arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      playerID
    ]
  */
  var serverID = arguments[0],
    playerID = arguments[1],
    name = arguments[2],
    score = arguments[3],
    scoreMax = arguments[4],
    weaponUsed = arguments[5]

  // Retrieve the map information
  var server = ServerStore.retrieve(serverID),
    map = server.map

  // Send web request
  var request = popsicle.request({
    method: 'POST',
    url: 'https://1st-rrf.com/api/training/ranges',
    body: {
      steam_id: playerID,
      range : name,
      score: score,
      scoreMax: scoreMax,
      weapon: weaponUsed
    }
  })

  return bluebird.resolve('done')

}
