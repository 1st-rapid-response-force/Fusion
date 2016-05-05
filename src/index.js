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
var savePositionHandler = require('./modules/persistence/player/SavePosition')
register(rpc, 'save_position', savePositionHandler)

// Register Restore Position handler
var restorePositionHandler = require('./modules/persistence/player/RestorePosition')
register(rpc, 'restore_position', restorePositionHandler)

// Register Save Inventory handler
var saveInventoryHandler = require('./modules/persistence/player/SaveInventory')
register(rpc, 'save_inventory', saveInventoryHandler)

// Regist Restore Inventory handler
var restoreInventoryHandler = require('./modules/persistence/player/RestoreInventory')
register(rpc, 'restore_inventory', restoreInventoryHandler)

// Register Player Status handler
var saveStatusHandler = require('./modules/persistence/player/SaveStatus')
register(rpc, 'save_player_status', saveStatusHandler)

// Register Player Status handler
var restoreStatusHandler = require('./modules/persistence/player/RestoreStatus')
register(rpc, 'restore_player_status', restoreStatusHandler)

// Register Save Qualification handler
var saveQualification = require('./modules/training/player/SaveQualification')
register(rpc, 'save_qualification', saveQualification)

// Register Range Begin Handler
var rangeBegin = require('./modules/training/RangeBegin')
register(rpc, 'range_begin', rangeBegin)

// Register Range Increment Handler
var rangeIncrement = require('./modules/training/RangeIncrement')
register(rpc, 'range_increment', rangeIncrement)

// Register RangeRead Handler
var rangeRead = require('./modules/training/RangeRead')
register(rpc, 'range_read', rangeRead)

rpc.listen('localhost', 4000)
