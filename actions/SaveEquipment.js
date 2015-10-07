var AnalyticsService = require( '../services/AnalyticsService' ),
    User = require( '../models/User' )

function GetLoadout() {

}

GetLoadout.prototype.Register = function( Socket ) {

    // Connect the callback to the socket
    Socket.register('SAVE_PLAYER_INVENTORY', this.ProcessEvent)

}

GetLoadout.prototype.ProcessEvent = function( content, callback ) {

    // Process the UUID out
    var uuid = content[0][1]

    var content_array = content

    User.findOneAndUpdate({

        uuid: uuid

    }, {

        uuid: uuid,
        inventory: content_array

    }, {

        upsert:true

    }, function(err, doc){

        callback(err, doc)


    })

}

module.exports = new GetLoadout()