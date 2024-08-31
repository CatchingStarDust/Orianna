const { Schema, model } = require('mongoose'); 

const reactionSchema = new Schema({

    Guild: String,
    Message: String,
    Emoji: String,
    Role: String,
    ColourName: String,
});

module.exports = model( 'reactionSchema', reactionSchema);