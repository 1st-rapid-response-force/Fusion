var Socket = require( 'sock-rpc' ),
    Dotenv = require( 'dotenv' )

// Require Environmental Variables
Dotenv.load()

// Establish Serivces
var LoadoutService = require( './services/LoadoutService' )

// Register actions

    // Get Loadout Action
    var GetLoadoutAction = require( './actions/GetLoadout' )
    GetLoadoutAction.Register(Socket)


var Bridge = Socket.listen('localhost', 9999)