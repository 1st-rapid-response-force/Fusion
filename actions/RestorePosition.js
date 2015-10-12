var AnalyticsService = require( '../services/AnalyticsService' ),
    User = require( '../models/User' )

function RestorePosition() {

}

RestorePosition.prototype.Register = function( Socket ) {

    // Connect the callback to the socket
    Socket.register('RESTORE_PLAYER_POSITION', this.ProcessEvent)

}

RestorePosition.prototype.ProcessEvent = function( uuid, callback ) {

    User.findById({

        uuid: uuid

    }, function(err, doc){

        callback(err, [doc.position.x, doc.position.y, doc.position.z])


    })

}

module.exports = new RestorePosition()