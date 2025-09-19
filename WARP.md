# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Running the Bot
```bash
# Start the bot
npm start

# Install dependencies
npm install
```

### Command Management
```bash
# Deploy slash commands to Discord (required after command changes)
node src/deployCommands.js
```

### Environment Setup
- Create a `.env` file in the project root with:
  - `TOKEN` - Discord bot token
  - `CLIENT_ID` - Discord application client ID
  - `GUILD_ID` - Discord server ID for command deployment
  - `MONGODB_URI` - MongoDB connection string

## Architecture Overview

### Core Bot Structure
Orianna is a Discord.js v14 bot with a modular command system that manages user inventories and role colors through a gacha-style capsule system.

**Main Entry Point (`src/index.js`)**
- Initializes Discord client with necessary intents
- Dynamically loads commands from `src/commands/` directory
- Sets up MongoDB connection via Mongoose
- Handles interaction events and error management
- Imports the role color assignment system

**Command System**
- Commands are stored as separate modules in `src/commands/`
- Each command exports a `data` property (SlashCommandBuilder) and `execute` function
- Commands are automatically registered via the file system scan in `index.js`
- Use `deployCommands.js` to register slash commands with Discord API

### Database Architecture (MongoDB/Mongoose)

**User Profile Schema (`src/schemas/UserProfile.js`)**
- Tracks user inventory, capsules owned, colors unlocked
- Stores timestamps for cooldowns and daily collection tracking
- Core fields: `userId`, `basicCapsules`, `coloursOwned[]`, `capsulesOpened`

**Reaction Role System (`src/schemas/roleColourData.js`)**
- Maps message reactions to Discord roles and color names
- Links emojis to specific roles that users can equip
- Enables color role assignment through reaction-based interface

### Core Game Systems

**Color Gacha System**
- Weighted random selection defined in `src/schemas/colourCategoriesAndWeights.js`
- Basic colors have 90% drop rate, special collections share 10%
- Collections include: Basic, Autumn, Pastel, Holiday, Valentine
- RNG logic in `src/functions/ColourWeightsRng.js`

**Role Color Management (`src/functions/assignRoleColour.js`)**
- Listens for message reaction events (add/remove)
- Validates user ownership of colors before role assignment
- Automatically removes conflicting color roles when equipping new ones
- Posts confirmation messages to designated channel

### Key Command Categories

**Inventory Management**
- `get-capsule` - Awards capsules to users
- `inventory` - Displays user's colors and capsules
- `open-capsule` / `open-ten-capsules` - Gacha mechanics

**Administration**
- `react-role` - Creates reaction-role mappings for color assignment
- Subcommands: `add` and `remove` for managing reaction roles

### Utility Functions

**Helper Functions (`src/functions/`)**
- `checks.js` - Validation functions (server membership, capsule ownership)
- `cooldownTimers.js` - Daily collection and rate limiting
- `findRandomCapsule.js` - Capsule distribution logic

**Embed System (`src/embeds.js`)**
- Standardized Discord embed templates
- Error handling embeds, capsule result displays
- Consistent styling with guild icons and color schemes

## Important Implementation Notes

### Color Name Mapping
- Colors in database use kebab-case names (e.g., 'jack-o-lantern-orange')
- Discord roles should match these names exactly (case-insensitive)
- Role assignment depends on exact string matching between DB and Discord roles

### Reaction Role System Requirements
- Target channel ID is hardcoded (`'1145845796005236916'`)
- Requires proper emoji format handling (custom vs Unicode)
- Users must own colors in inventory before equipping roles

### Error Handling Patterns
- Commands use `interaction.deferReply()` for complex operations
- Database operations wrapped in try-catch with user-friendly error messages
- Partial reaction fetching handled for message reaction events

### Development Workflow
1. Add new commands to `src/commands/` directory
2. Run `node src/deployCommands.js` to register with Discord
3. Update `deployCommands.js` if adding new slash command definitions
4. Test with environment variables properly configured
5. MongoDB connection required for user data persistence