/**
  Reset a range score to zero
**/
var winston = require('winston'),
  Promise = require('bluebird'),
  RangeStore = require('../../datastores/RangeMemory')

var rangeBegin = function (arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      rangeID
    ]
  */
  var serverID = arguments[0],
    rangeID = arguments[1]

  RangeStore.reset(serverID, rangeID)

  return Promise.resolve(true)
}

module.exports = rangeBegin
