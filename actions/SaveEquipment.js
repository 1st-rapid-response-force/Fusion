var AnalyticsService = require( '../services/AnalyticsService' ),
    User = require( '../models/User' )

function SaveEquipment() {

}

SaveEquipment.prototype.Register = function( Socket ) {

    // Connect the callback to the socket
    Socket.register('SAVE_PLAYER_INVENTORY', this.ProcessEvent)

}

SaveEquipment.prototype.ProcessEvent = function( uuid, content, callback ) {

    User.findOneAndUpdate({

        uuid: uuid

    }, {

        uuid: uuid,
        inventory: content

    }, {

        upsert:true

    }, function(err, doc){

        callback(err, doc)


    })

}

module.exports = new SaveEquipment()