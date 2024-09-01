// the data of all server members. contains:
// their unique id
// the time stamp of the last time they ran the "daily" command
// a number of how many capsules they have opened in general
// names(string) of any colours they got from capsules
// a seperate counter for each capsule type
const { Schema, model } = require('mongoose');

const userProfileSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    lastDailyCollected: { type: Date },
    lastTimePosted: { type: Date },
    capsulesOpened: { type: Number, default: 0 },
    coloursOwned: { type: [ String ], unique: true },
    basicCapsules: { type: Number, default: 0  },
    holidayCapsules: { type: Number, default: 0  },
    autumnCapsules: { type:  Number, default: 0  },
}, {
    timestamps: true
});

module.exports = model('UserProfile', userProfileSchema);
