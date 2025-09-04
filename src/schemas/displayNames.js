const UserProfile = require('../schemas/UserProfile');

//grab discord id and display name from whoever ran the command

async function updateUserNames(interaction) {
    const ServerMemberId = interaction.user.id;
    const serverMemberUsername = interaction.user.username ?? null;
    const serverMemberDisplayName = interaction.user.globalName ?? null;

    const guildId = interaction.guild?.id ?? null;
    const guildDisplay = interaction.member?.displayName ?? null;

    const update = {
        serverMemberUsername,
        serverMemberDisplayName,
        guildDisplay,
        updatedAt: new Date()
    };

    if (guildId && guildDisplay) {
        update[`serverMemberDisplayName.${guildId}`] = guildDisplay;

    }

    await UserProfile.updateOne(
        {userId: ServerMemberId},
        {$set: update, $setOnInsert: {userId: ServerMemberId}},
        {upsert: true}
    );

}

module.exports.updateUserNames = updateUserNames;