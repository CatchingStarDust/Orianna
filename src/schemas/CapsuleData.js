const { Schema, model, models } = require('mongoose');

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

// Check if the models are already defined
const BasicCapsule = models.BasicCapsule || model('BasicCapsule', basicCapsule);
const HolidayCapsule = models.HolidayCapsule || model('HolidayCapsule', holidayCapsule);
const AutumnCapsule = models.AutumnCapsule || model('AutumnCapsule', autumnCapsule);

module.exports = {
    BasicCapsule,
    HolidayCapsule,
    AutumnCapsule
};
