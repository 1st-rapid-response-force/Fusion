/*
 Retrieve the Medical status of a stored unit
 */
var ServerStore = require('../../datastores/ServerMemory'),
    Medical = require('../../datastores/models/Medical')

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
  var query = Medical.query({
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
        return _.map([
          "ace_medical_pain",
          "ace_medical_morphine",
          "ace_medical_bloodVolume",
          "ace_medical_isUnconscious",
          "ace_medical_tourniquets",
          "ace_medical_openWounds",
          "ace_medical_bandagedWounds",
          "ace_medical_internalWounds",
          "ace_medical_lastUniqueWoundID",
          "ace_medical_heartRate",
          "ace_medical_heartRateAdjustments",
          "ace_medical_bloodPressure",
          "ace_medical_peripheralResistance",
          "ace_medical_fractures",
          "ace_medical_triageLevel",
          "ace_medical_triageCard",
          "ace_medical_salineIVVolume",
          "ace_medical_plasmaIVVolume",
          "ace_medical_bloodIVVolume",
          "ace_medical_bodyPartStatus",
          "ace_medical_airwayStatus",
          "ace_medical_airwayOccluded",
          "ace_medical_airwayCollapsed",
          "ace_medical_inCardiacArrest",
          "ace_medical_hasLostBlood",
          "ace_medical_isBleeding",
          "ace_medical_hasPain",
          "ace_medical_medicalLogs",
          "ace_medical_logFile_activity",
          "ace_medical_logFile_activity_view"
        ], function(value) {

          return result.get(value)

        })

      })
      .catch(Medical.NotFoundError, function() {

        // Failed to retrieve position so return false to signal to the server
        return false

      })

  return retriever
}
