/**

  A simple in memory store of registered servers

**/

var servers = []

module.exports = {
  register: function(name, map) {

    var new_length = servers.push({
      name: name,
      map: map
    })

    // Return the server's retrieval ID.
    return new_length - 1

  },
  retrieve: function(id) {
    return servers[id]
  }
}
