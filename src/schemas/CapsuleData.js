const { Schema, model } = require('mongoose');

// These are the colours that are included in the capsules
const basicCapsuleRoleColours = [
    '#FF5733', 
    '#FF5733', 
    '#FF5733', 
];

// Basic Capsule Schema
const basicCapsuleSchema = new Schema({
    color: { type: String, enum: basicCapsuleRoleColours, required: true },
});

const basicCapsule = new Schema({
    username: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    capsule: [basicCapsuleSchema]
});

// Holiday Capsule Schema

const holidayCapsuleRoleColours = [
    '#FF5733', 
    '#FF5733', 
    '#FF5733', 
];

const holidayCapsuleSchema = new Schema({
    color: { type: String, enum: holidayCapsuleRoleColours, required: true },
});

const holidayCapsule = new Schema({
    username: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    capsule: [holidayCapsuleSchema]
});

// Autumn Capsule Schema
const autumnCapsuleRoleColours = [
    '#FF5733', 
    '#FF5733', 
    '#FF5733', 
];


const autumnCapsuleSchema = new Schema({
    color: { type: String, enum: autumnCapsuleRoleColours, required: true },
});

const autumnCapsule = new Schema({
    username: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    capsule: [autumnCapsuleSchema]
});

module.exports = model('basicCapsule', basicCapsuleSchema);
module.exports = model('holidayCapsule', holidayCapsuleSchema);
module.exports = model('autumnCapsule', autumnCapsuleSchema);