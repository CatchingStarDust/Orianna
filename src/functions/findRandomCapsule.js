const { Client, GatewayIntentBits, Events, EmbedBuilder, Guild  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const weightedRandomSelect = require('../functions/weightedRandomSelect');

// ori listens to every message sent in the server (she listens to each member ids messages separately) 
// assign the author of the post to their ID in the userProfile database to ensure that any earned capsules go to whoever posted the message
const serverMember = await UserProfile.findOne({ Guild: guild.id, userId: message.author.id });


client.on('messageCreate', (message) => {

    // if the message comes from ori, or is not in the server
    //she does nothing so she doesn't count herself as a server member and give herself capsules
    if (!guild || message.author.bot) return;
});

// on each message from a member id, ori runs a weighted random selection for two options: YES and NO with a different percentage chance of being chosen


// if YES is chosen, ori will run another weighted random select that chooses a specific capsule

// create a new capsule and puts it in the author's inventory

// increment the author of that post's corresponding capsule inventory count by 1 

// save the change so that the capsule is recorded in the userProfile database

// ori sends an embeds that alerts the member that they have "found" a capsule in whatever channel the winning message was posted in
// and stops listening to that specific member id for 30 seconds
message.channel.send({ embeds: [embed],});

// if NO is chosen, ori does nothing and does NOT go on cooldown