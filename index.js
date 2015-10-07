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

// Establish Serivces
var LoadoutService = require( './services/LoadoutService' )

// Register actions

    // Get Loadout Action
    var GetLoadoutAction = require( './actions/GetLoadout' )
    GetLoadoutAction.Register(Socket)

Mongoose.connect(process.env.MONGO_URI, mongooseOptions)

var Bridge = Socket.listen('localhost', 9999)