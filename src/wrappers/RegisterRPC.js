// Register a listener function with the Sock RPC Library
// Also attached analytics and logging
var winston = require('winston'),
  executionTimeAnalytics = require('./executionTimeMonitor')

module.exports = function( socket, function_name, implementation ) {

  socket.register(function_name, function(argument, callback) {

    winston.info('RPC Call recevied - ' + function_name)
    var start_time = Date.now()

    implementation(argument)
      .then(function(response) {
        callback(null, response)
      })
      .catch(function(error) {
        callback(error)
      })
      .finally(function() {
        // Record run time and pass to analytics
        var finish_time = Date.now(),
          execution_time = finish_time - start_time

        executionTimeAnalytics.record(function_name, execution_time)
        winston.info('RPC Call Finished - ' + function_name + " - Execution Time: " + execution_time + "ms")
      })

  })

}
