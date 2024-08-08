const { Schema, model, models } = require('mongoose');

// Basic Capsule Schema
const basicCapsuleRoleColours = [
    '#FF5733', 
    '#FF5733', 
    '#FF5733', 
];

const basicCapsule = new Schema({
    username: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    color: { type: String, enum: basicCapsuleRoleColours, required: true },
});

// Holiday Capsule Schema
const holidayCapsuleRoleColours = [
    '#FF5733', 
    '#FF5733', 
    '#FF5733', 
];

const holidayCapsule = new Schema({
    username: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    color: { type: String, enum: holidayCapsuleRoleColours, required: true }
});

// Autumn Capsule Schema
const autumnCapsuleRoleColours = [
    '#FF5733', 
    '#FF5733', 
    '#FF5733', 
];

const autumnCapsule = new Schema({
    username: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    color: { type: String, enum: autumnCapsuleRoleColours, required: true }
});


const BasicCapsule = models.BasicCapsule || model('BasicCapsule', basicCapsule);
const HolidayCapsule = models.HolidayCapsule || model('HolidayCapsule', holidayCapsule);
const AutumnCapsule = models.AutumnCapsule || model('AutumnCapsule', autumnCapsule);

module.exports = { BasicCapsule, HolidayCapsule, AutumnCapsule };
