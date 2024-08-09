const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../schemas/UserProfile');
const { BasicCapsule, HolidayCapsule, AutumnCapsule } = require('../schemas/capsuleData');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Gives you your daily reward, including a random capsule!'),

    async execute(interaction) {
        
    }
};
