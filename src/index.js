// Setup the Logging Library
var winston = require('winston')

winston.info('Fusion Startup Sequence Initiated')

// Use dotenv to load environment
winston.info('Bootstraping environment')
var dotenv = require('dotenv')
winston.info('Environmental variables loaded')

// Intialize SQL Connection
winston.info('Initializing SQL Connection')
require('./datastores/Postgre')
winston.info('SQL Connection Intialized')

// Start up the node sock rpc server
winston.info('Starting socket server')
var rpc = require('sock-rpc')

// Register function calls
var register = require('./wrappers/RegisterRPC')

// Register Connection Establish
var registerServerHandler = require('./modules/utility/RegisterServer')
register(rpc, 'register_server', registerServerHandler)

rpc.listen('localhost', 4000)
