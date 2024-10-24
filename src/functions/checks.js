//check if user has capsules to open
const UserProfile = require('../schemas/UserProfile');

/** checks for autumn capsules */
const checkIfUserHasAutumnCapsules = async (serverMember, interaction) => {
    if (serverMember.autumnCapsules <= 0) {
        await interaction.editReply({ content: `You don't have any capsules to open!`, ephemeral: true });
        return false;
    }
    return true;
};

/** checks for basic capsules */
const checkIfUserHasBasicCapsules = async (serverMember, interaction) => {
    if (serverMember.basicCapsules <= 0) {
        await interaction.editReply({ content: `You don't have any capsules to open!`, ephemeral: true });
        return false;
    }
    return true;
};

/** assigns serverMember to the user profile check */
const getServerMember = async (userId) => {
    const serverMember = await UserProfile.findOne({ userId: userId });
    return serverMember; 
};

/** this checks if they are in pity or not */
const checkPityCounter = async (serverMember) => {

    const capsulesOpened = serverMember.capsulesOpened

    if (capsulesOpened === 50) {
        await UserProfile.findOneAndUpdate(
            { userId: serverMember.userId },
            { $inc: { capsulesOpened: 1 }},
            { new: true, upsert: true }
        )
        return 'halfPity';
    }

    if (capsulesOpened === 100) {
        await UserProfile.findOneAndUpdate(
            { userId: serverMember.userId },
            { $set: { capsulesOpened: 0 }},
            { new: true, upsert: true }
        )
        await serverMember.save();
        return 'maxPity';
    }
    return false;
}; 

/**exports */
module.exports.checkIfUserHasAutumnCapsules = checkIfUserHasAutumnCapsules;
module.exports.getServerMember = getServerMember;
module.exports.checkPityCounter = checkPityCounter;
module.exports.checkIfUserHasBasicCapsules = checkIfUserHasBasicCapsules;