const { schema, model } = require('mongoose');
const UserProfile = require('../../schemas/UserProfile');

//the capsule itself
const basicCapsuleItem = new Schema({
    username: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0},
    capsule: [basiccapsuleSchema]
});

//Capsule colours
const roleColours = [
    '#FF5733', //colour1
    '#FF5733', //colour2
    '#FF5733', //colour3
    '#FF5733', //colour4
    '#FF5733', //colour5
    '#FF5733', //colour6
    '#FF5733', //colour7
];

const basicCapsuleSchema = new Schema({
    color: { type: String, enum: roleColors, required: true },
});


module.exports = model('BasicCapsule', basicCapsuleSchema, basicCapsuleItem);