var popsicle = require( 'popsicle' ),
    _ = require( 'lodash' )


function GetLoadout() {

}

GetLoadout.prototype.Register = function( Socket ) {

    // Connect the callback to the socket
    Socket.register('GET_LOADOUT', this.ProcessEvent)

}

GetLoadout.prototype.ProcessEvent = function( uuid, callback ) {

    console.log('Request for a Loadout Received')
    // Request the loadout from the 1st RRF server
    var apiRequest = popsicle('https://1st-rrf.com/api/loadout/' + uuid)


    // Once the api Request is complete, reformat the the data into an array of couplets
    apiRequest.then(function(response) {

        console.log('Loadout received from server')
        return JSON.parse(response.body)

    }).then( function(body) {

        // Format the body into an array
        var loadout = _.map(body.loadout, function (item) {

            return [item.category, item.class_name]

        })

        return loadout

    } ).then( function(loadout) {

        console.log('Loadout pushed to client')
        callback(null, loadout)

    }).catch( function(error) {

        console.log('Error retrieving loadout:' + err)
        callback(error)

    })


}

module.exports = new GetLoadout()