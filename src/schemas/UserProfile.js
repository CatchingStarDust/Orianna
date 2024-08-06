const { Schema, model } = require('mongoose');

const userProfileSchema = new Schema({
    userId: { type: String, required: true },
    capsules: { type: Number, default: 0 },
    lastDailyCollected: { type: Date }, 
    capsulesOpened: { type: Number, default: 0 },
    roleColor: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = model('UserProfile', userProfileSchema);
