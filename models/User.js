var Mongoose = require( 'mongoose' ),
    Schema = Mongoose.Schema

var userSchema = new Schema({

    uuid: {
        type: String
    },

    inventory: {
        type: Schema.Types.Mixed
    },

    position: {
        x: {
            type: Number
        },
        y: {
            type: Number
        },
        z: {
            type: Number
        }
    }

})

var User = Mongoose.model('User', userSchema)

module.exports = User