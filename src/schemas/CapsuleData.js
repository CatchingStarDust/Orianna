const { schema, model } = require('mongoose');

//the whole capsule as an item
const basicCapsuleItem = new Schema({
    username: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0},
    capsule: [basiccapsuleSchema]
});

//These are the colours that are included in the capsule
const roleColours = [
    '#FF5733', //colour1
    '#FF5733', //colour2
    '#FF5733', //colour3
    '#FF5733', //colour4
    '#FF5733', //colour5
    '#FF5733', //colour6
    '#FF5733', //colour7
];

//This is the schema that sets the attributes of what's inside the capsule
const basicCapsuleSchema = new Schema({
    color: { type: String, enum: roleColors, required: true },
});


module.exports = model('capsuleData', basicCapsuleSchema, basicCapsuleItem);