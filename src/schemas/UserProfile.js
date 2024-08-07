const { Schema, model } = require('mongoose');

const userProfileSchema = new Schema({
    userId: { type: String, required: true },
    lastDailyCollected: { type: Date },
    capsulesOpened: { type: Number, default: 0 },
    roleColor: { type: String, required: true },
    basicCapsules: [{ type: Schema.Types.ObjectId, ref: 'BasicCapsule' }],
    holidayCapsules: [{ type: Schema.Types.ObjectId, ref: 'HolidayCapsule' }],
    autumnCapsules: [{ type: Schema.Types.ObjectId, ref: 'AutumnCapsule' }],
}, {
    timestamps: true
});

module.exports = model('UserProfile', userProfileSchema);
