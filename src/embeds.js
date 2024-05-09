const { EmbedBuilder } = require('discord.js');


// generic embed for  responses
const genericEmbed = (interaction, title, description) => {
    const guildIcon = interaction.guild.iconURL({ dynamic: true, size: 512 });
    return new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle(title || 'Note')
      .setThumbnail(guildIcon)
      .setDescription('Work in progress!')
      .addFields({ name: 'Note', value: 'Work in progress!' });
  };

// Ori's error message reply embed
function errorMsgEmbed(interaction, error) {
    const guildIcon = interaction.guild.iconURL({ dynamic: true, size: 512 });

    return new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('The Ball is angry...')
      .setDescription(`An error occurred: ${error.message}`);
  }


module.exports = { genericEmbed, errorMsgEmbed, };