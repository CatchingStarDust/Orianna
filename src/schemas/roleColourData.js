const { Schema, model } = require('mongoose'); 

let reactionSchema = new Schema({
    Guild: String,
    Message: String,
    Emoji: String,
    Role: String
});

module.exports = model( 'reactions', reactionSchema,);

// Basic Roles
const basicColourRoles = [
    {
        id: '945402694204551209',
        colourName: 'redRoleColour'
    },

    {
        id: '945402837297426454',
        colourName: 'yellowRoleColour'
    },

    {
        id: '945402816934076427',
        colourName: 'orangeRoleColour'
    },

    {
        id: '945402839964999680',
        colourName: 'greenRoleColour'
    },

    {
        id: '945402841290399864',
        colourName: 'blueRoleColour'
    },

    {
        id: '945402841936314368',
        colourName: 'purpleRoleColour'
    },

    {
        id: '945402842234110023',
        colourName: 'pinkRoleColour'
    },

    {
        id: '945402842829692960',
        colourName: 'seafoamRoleColour'
    },

    {
        id: '945402843240747039',
        colourName: 'greyRoleColour'
    },

    {
        id: '945402843924402257',
        colourName: 'slateRoleColour'
    },
]

module.exports = { basicColourRoles, };