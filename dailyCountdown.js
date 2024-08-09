    const now = new Date();

    const lastDailyCollected = userProfile.lastDailyCollected || new Date(0);

    const twentyFourHours = 24 * 60 * 60 * 1000;

        if (now - lastDailyCollected < twentyFourHours) {
            await interaction.editReply({ content: 'You have already collected your daily reward today!', ephemeral: true });
            
            return;
        }

    userProfile.lastDailyCollected = now;