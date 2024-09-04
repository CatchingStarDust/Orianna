
/* async execute(interaction) => {
    data: new SlashCommandBuilder()
        .setName('openHolidayCapsule')
        .setDescription('Gives holiday colours'),

        await interaction.deferReply();

        const serverMember = await UserProfile.findOne({ userId: interaction.user.id });

        let pityCount = new Map();

    /* keeps track of how many capsules the user has opened.
    If the user has opened 50 capsules and didnt' receive a colour, the system will make it so 
    the user is guarenteed a colour 

    pityCount.set(serverMember, (pityCount.get(serverMember) || 0) + 1);

    /* pity activated 
    if (!capsulesOpened.get(serverMember) === 50) {

        /* probably going to have to clone the gacha and make one that is guarenteed to give a colour 
    } 

} */

