const { Schema, model } = require('mongoose');

const userProfileSchema = new Schema({
    userId: { type: String, required: true, },
    capsules: { type: Number, default: 0, },
    LastDailyCapsuleCollected: { type: String, Date, },
    capsulesOpened: { type: Number, default: 0, },

},
    { timestamps: true },
);


module.exports = model('UserProfile', userProfileSchema,);