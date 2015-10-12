var Socket = require( 'sock-rpc' ),
    Dotenv = require( 'dotenv' )

// Require Environmental Variables
Dotenv.load()

// Connect to Mongo
var Mongoose = require( 'mongoose' )

var mongooseOptions = {
    server: {
        socketOptions: {
            keepAlive: 1
        },
        replset: {
            socketOptions: {
                keepAlive: 1
            }
        }
    }
}

Mongoose.connect(process.env.MONGO_URI, mongooseOptions)

// Register actions

    // Get Loadout Action
    var GetLoadoutAction = require( './actions/GetLoadout' )
    GetLoadoutAction.Register(Socket)

    // Save Equipment Action
    var SaveEquipmentAction = require( './actions/SaveEquipment' )
    SaveEquipmentAction.Register(Socket)

    // Save Position Action
    var SavePositionAction = require( './actions/SavePosition' )
    SavePositionAction.Register(Socket)

    // Restore Equipment Action
    var RestoreEquipmentAction = require( './actions/RestoreEquipment' )
    RestoreEquipmentAction.Register(Socket)

    // Restore Position Action
    var RestorePositionAction = require( './actions/RestorePosition' )
    RestorePositionAction.Register(Socket)

Mongoose.connect(process.env.MONGO_URI, mongooseOptions)

var Bridge = Socket.listen('localhost', 9999)