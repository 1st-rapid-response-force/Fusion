/**
  Reset a range score to zero
**/
var winston = require('winston'),
  Promise = require('bluebird'),
  RangeStore = require('../../datastores/RangeMemory')

var rangeRead = function (arguments) {

  /*
   Expects the following arguments
    arguments = [
      serverID,
      rangeID
    ]
  */
  var serverID = arguments[0],
    rangeID = arguments[1]

  return Promise.resolve(RangeStore.report(serverID, rangeID))
}

module.exports = rangeRead
