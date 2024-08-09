
const UserProfile = require('../schemas/UserProfile');

function createNewProfile() {
    newServerMember = new UserProfile({ 
        userId, 
        lastDailyCollected: new Date(0), 
        capsules: 0, 
        basicCapsules: [], 
        holidayCapsules: [], 
        autumnCapsules: [] });
    return newServerMember.save();

};
module.exports = createNewProfile;
