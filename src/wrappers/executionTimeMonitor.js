var Keen = require('../datastores/Keen')

module.exports = {
  record: function(function_name, time) {

    var functionCallEvent = {
      function: function_name,
      time: time,
      keen: {
        timestamp: new Date().toISOString()
      }
    }

    // We literally don't give a single fuck if this call fails
    Keen.addEvent('execution_times', functionCallEvent)

  }
}
