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

winston.info('Loading Utility Functions')

// Register Connection Establish
var registerServerHandler = require('./modules/utility/RegisterServer')
register(rpc, 'register_server', registerServerHandler)

/*
  Load Analytics Events
*/

winston.info('Loading Analytics Functions')

// Register Playtime Handler
var playtimeAnalyticsHandler = require('./modules/analytics/Playtime')
register(rpc, 'analytics_playtime', playtimeAnalyticsHandler)

// Register Death Handler
var deathAnalyticsHandler = require('./modules/analytics/Death')
register(rpc, 'analytics_death', deathAnalyticsHandler)

/*
  Load Persistence Functions
*/

winston.info('Loading Persistence Functions')

// Register Save Position Handler
var savePositionHandler = require('./modules/persistence/SavePosition')
register(rpc, 'save_position', savePositionHandler)

// Register Restore Position handler
var restorePositionHandler = require('./modules/persistence/RestorePosition')
register(rpc, 'restore_position', restorePositionHandler)

// Register Save Position handler
var saveInventoryHandler = require('./modules/persistence/SaveInventory')
register(rpc, 'save_inventory', savePositionHandler)

// Regist Restore Position handler
var restoreInventoryHandler = require('./modules/persistence/RestoreInventory')
register(rpc, 'restore_inventory', restorePositionHandler)

rpc.listen('localhost', 4000)
