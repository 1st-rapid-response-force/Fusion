/**

  A simple in memory store for range scores.

  Handles the information naively.

**/

// Ranges is a map
// The keys are unique ID's of structure SERVER_ID-RANGE_ID
var ranges = {}

module.exports = {
  reset: function(server_id, range_id) {

    // Build the compound ID
    var compound_id = server_id + "-" + range_id

    // Set the range value to zero
    ranges[compound_id] = 0

  },
  increment: function(server_id, range_id) {

    // Build the component ID
    var compound_id = server_id + "-" + range_id

    // Increment the range value
    ranges[compound_id] ++

    return ranges[compound_id]
  },
  report: function(server_id, range_id) {

    // Build the component ID
    var compound_id = server_id + "-" + range_id

    return ranges[compound_id]

  }
}
