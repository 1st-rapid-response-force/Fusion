// Setup the Logging Library
var winston = require('winston')

winston.info('Fusion Startup Sequence Initiated')

// Use dotenv to load environment
winston.info('Bootstraping environment')
var dotenv = require('dotenv')
dotenv.config()
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

/*
  Load Utility Functions
*/

// Register Connection Establish
var registerServerHandler = require('./modules/utility/RegisterServer')
register(rpc, 'register_server', registerServerHandler)

/*
  Load Analytics Events
*/

// Register Playtime Handler
var playtimeAnalyticsHandler = require('./modules/analytics/Playtime')
register(rpc, 'analytics_playtime', playtimeAnalyticsHandler)

// Register Death Handler
var deathAnalyticsHandler = require('./modules/analytics/Death')
register(rpc, 'analytics_death', deathAnalyticsHandler)

rpc.listen('localhost', 4000)
