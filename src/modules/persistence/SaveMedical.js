/*
  Persist the encoded array for medical settings of the unit to the datastore.
*/
var ServerStore = require('../../datastores/ServerMemory'),
  Medical = require('../../datastores/models/Medical'),
  _ = require('underscore')

module.exports = function(arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      playerID,
      medicalArray[
        pain,
        morphine,
        bloodVolume,
        isUnconscious,
        tourniquets,
        openWounds,
        bandagedWounds,
        internalWounds,
        lastUniqueWoundID,
        heartRate,
        heartRateAdjustments,
        bloodPressure,
        peripheralResistance,
        fractures,
        triageLevel,
        triageCard,
        salineIVVolume,
        plasmaIVVolume,
        bloodIVVolume,
        bodyPartStatus,
        airwayStatus,
        airwayOccluded,
        airwayCollapsed,
        inCardiacArrest,
        hasLostBlood,
        isBleeding,
        hasPain,
        medicalLogs,
        logFile_activity,
        logFile_activity_view
      ]
    ]
  */
  var serverID = arguments[0],
    playerID = arguments[1],
    medicalArray = arguments[2]

  // Retrieve the map information
  var server = ServerStore.retrieve(serverID),
    map = server.map

  // Check if the user already has a Medical History saved in the database
  var query = Medical.query({
    where: {
      player_guid: playerID,
      map: map
    }
  }).fetch({
    require: true
  })

  // Construct the medical array
  var serializedArrayObject = _.object(
    [
      pain,
      morphine,
      bloodVolume,
      isUnconscious,
      tourniquets,
      openWounds,
      bandagedWounds,
      internalWounds,
      lastUniqueWoundID,
      heartRate,
      heartRateAdjustments,
      bloodPressure,
      peripheralResistance,
      fractures,
      triageLevel,
      triageCard,
      salineIVVolume,
      plasmaIVVolume,
      bloodIVVolume,
      bodyPartStatus,
      airwayStatus,
      airwayOccluded,
      airwayCollapsed,
      inCardiacArrest,
      hasLostBlood,
      isBleeding,
      hasPain,
      medicalLogs,
      logFile_activity,
      logFile_activity_view
    ],
    medicalArray
  )

  var updater = query
    .then(function(result) {
      // Result existed so we need to update it
      var upsertValue = serializedArrayObject
      upsertValue.updated_at = new Date()

      result.set(upsertValue)

      return result.save()
    })
    .catch(Medical.NotFoundError, function() {

      var insertionObject = serializedArrayObject
      insertionObject.player_guid = playerID
      insertionObject.map = map
      insertionObject.updated_at = new Date(),
      insertionObject.created_at = new Date()


      // Build a new Meidcal Array
      var new_medical = new Inventory(insertionObject)

      return new_medical.save()
    }).then(function(saved_medical) {
      return true
    })

  return updater

}
