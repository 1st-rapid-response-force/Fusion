var AnalyticsService = require( '../services/AnalyticsService' ),
    User = require( '../models/User' )

function SavePosition() {

}

SavePosition.prototype.Register = function( Socket ) {

    // Connect the callback to the socket
    Socket.register('SAVE_PLAYER_POSITION', this.ProcessEvent)

}

SavePosition.prototype.ProcessEvent = function( content, callback ) {

    // Process the UUID out
    var uuid = content[0]

    var position = content[1]

    User.findOneAndUpdate({

        uuid: uuid

    }, {

        uuid: uuid,
        position: {
            x: position[0],
            y: position[1],
            z: position[2]
        }

    }, {

        upsert:true

    }, function(err, doc){

        callback(err, doc)


    })

}

module.exports = new SavePosition()