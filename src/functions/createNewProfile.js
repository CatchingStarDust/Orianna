const UserProfile = require('../schemas/UserProfile');

function createNewProfile(userId) {
    const newServerMember = new UserProfile({ 
        userId: userId, 
        lastDailyCollected: new Date(0), 
        lastTimePosted: new Date(0),
        capsulesOpened: 0, 
        basicCapsules: 0, 
        holidayCapsules: 0, 
        autumnCapsules: 0 
    });
    return newServerMember.save();
};

module.exports = createNewProfile;
