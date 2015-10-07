var Mongoose = require( 'mongoose' ),
    Schema = Mongoose.Schema

var userSchema = new Schema({

    uuid: {
        type: String
    },

    inventory: {
        type: Schema.Types.Mixed
    }

})

var User = Mongoose.model('User', userSchema)

module.exports = User