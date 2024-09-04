const { Schema, model } = require('mongoose'); 

const reactionSchema = new Schema({
    Guild: { type: [String], unique: true },
    MessageChannel: { type: [String] },
    Message: { type: String, unique: true },
    Emoji: { type: [String], unique: true },
    Role: { type: [String], unique: true },
    ColourName: { type: [String], unique: true },
});

module.exports = model( 'reactionSchema', reactionSchema);