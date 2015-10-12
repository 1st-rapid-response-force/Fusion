var AnalyticsService = require( '../services/AnalyticsService' ),
    User = require( '../models/User' )

function RestoreEquipment() {

}

RestoreEquipment.prototype.Register = function( Socket ) {

    // Connect the callback to the socket
    Socket.register('RESTORE_PLAYER_EQUIPMENT', this.ProcessEvent)

}

RestoreEquipment.prototype.ProcessEvent = function( uuid, callback ) {

    User.find({

        uuid: uuid

    }, function(err, doc){

        if ( ! doc ) {
            callback('Error')
        }

        callback(err, doc.inventory)


    })

}

module.exports = new RestoreEquipment()