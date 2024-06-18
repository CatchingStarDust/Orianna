const { schema, model } = require('mongoose');
const UserProfile = require('../../schemas/UserProfile');

const basicCapsuleSchema = new Schema({
    color: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1},
});

module.exports = model('BasicCapsule', basicCapsuleSchema);