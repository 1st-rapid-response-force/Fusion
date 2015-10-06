var popsicle = require( 'popsicle' ),
    _ = require( 'lodash' )


function GetLoadout() {

}

GetLoadout.prototype.Register = function( Socket ) {

    // Connect the callback to the socket
    Socket.register('GET_LOADOUT', this.ProcessEvent)

}

GetLoadout.prototype.ProcessEvent = function( uuid, callback ) {

    // Request the loadout from the 1st RRF server
    var apiRequest = popsicle('https://1st-rrf.com/api/loadout/' + uuid)


    // Once the api Request is complete, reformat the the data into an array of couplets
    apiRequest.then(function(response) {

        return JSON.parse(response.body)

    }).then( function(body) {

        // Format the body into an array
        var loadout = _.map(body.loadout, function (item) {

            return [item.category, item.class_name]

        })

        return loadout

    } ).then( function(loadout) {

        callback(null, loadout)

    }).catch( function(error) {

        callback(error)

    })


}

module.exports = new GetLoadout()