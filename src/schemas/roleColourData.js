const { Schema, model } = require('mongoose'); 

const reactionSchema = new Schema({
    Guild: { type: String, required: true },
    MessageChannel: { type: String, required: true },
    Message: { type: String, required: true },
    Emoji: { type: String, required: true },
    Role: { type: String, required: true },
    ColourName: { type: String, required: true },
});

const ReactionPost = model('ReactionPost', reactionSchema);

module.exports = ReactionPost;
