/**
  Increment a range score by one
**/
var winston = require('winston'),
  Promise = require('bluebird'),
  RangeStore = require('../../datastores/RangeMemory')

var rangeIncrement = function (arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      rangeID
    ]
  */
  var serverID = arguments[0],
    rangeID = arguments[1]

  RangeStore.increment(serverID, rangeID)

  return Promise.resolve(RangeStore.report(serverID, rangeID))
}

module.exports = rangeIncrement
