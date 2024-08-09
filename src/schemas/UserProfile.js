const { Schema, model } = require('mongoose');

const userProfileSchema = new Schema({
    userId: { type: String, required: true },
    lastDailyCollected: { type: Date },
    capsulesOpened: { type: Number, default: 0 },
    roleColor: { type: String, required: true },
    basicCapsules: { type: Number, default: 0  },
    holidayCapsules: { type: Number, default: 0  },
    autumnCapsules: { type:  Number, default: 0  },
}, {
    timestamps: true
});

module.exports = model('UserProfile', userProfileSchema);
