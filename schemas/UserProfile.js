const {schema, model} = require('mongoose');

const userProfileSchema = new Schema({
    userId: {type: String,required: true,},

    balance: {type: Number,default: 0,},

    LastDailyCapsuleCollected: {type: date,},

},
 {timestamps: true },
);

module.exports = model('UserProfile', userProfileSchema, );