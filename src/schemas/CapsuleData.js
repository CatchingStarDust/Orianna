const { Schema, model, models } = require('mongoose');

// Basic Capsule Schema
const basicCapsuleSchema = new Schema({
    colors: [{ type: String, required: true, 
        enum: [
            'red', 
            'orange', 
            'yellow', 
            'green', 
            'blue', 
            'purple', 
            'pink',
            'seafoam', 
            'grey', 
            'slate',  
        ] }]
});

// Holiday Capsule Schema
const holidayCapsuleSchema = new Schema({
    colors: [{ type: String, required: true, 
        enum: [
            'ribbonRed', 
            'snowflakeWhite',
            'nerotBlue',
            'mistletoeGreen',
        ] }]
});

// Autumn Capsule Schema
const autumnCapsuleSchema = new Schema({
    colors: [{ type: String, required: true, enum: ['#FF5733', '#FFFF00', '#00FF00'] }]
});

const openBasicCapsule = models.BasicCapsuleSchema || model('BasicCapsuleSchema', basicCapsuleSchema);
const openHolidayCapsule = models.HolidayCapsuleSchema || model('HolidayCapsuleSchema', holidayCapsuleSchema);
const openAutumnCapsule = models.AutumnCapsuleSchema || model('AutumnCapsuleSchema', autumnCapsuleSchema);

module.exports = { openBasicCapsule, openHolidayCapsule, openAutumnCapsule };