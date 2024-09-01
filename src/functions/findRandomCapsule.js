const { Client, GatewayIntentBits, Events, EmbedBuilder, Guild  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const weightedRandomSelect = require('../functions/weightedRandomSelect');

// ori listens to every message sent in the server (she listens to each member ids messages separately) 
// assign the author of the post to their ID in the userProfile database to ensure that any earned capsules go to whoever posted the message
const serverMember = await UserProfile.findOne({ Guild: Guild.id, userId: message.author.id });


Client.on(MessageChannel)

// on each message from a member id, ori runs a weighted random selection for two options: YES and NO with a different percentage chance of being chosen


// if YES is chosen, ori will run another weighted random select that chooses a specific capsule
// ori increments the author of that post's corresponding capsule inventory count by 1 
// save the change so that the capsule is recorded in the userProfile database

// ori sends an embeds that alerts the member that they have "found" a capsule

// if NO is chosen, ori does nothing and stops listening to that specific member id for a minute
// when the cool down is over, ori will begin listening to messages from that member id again