const {schema, model} = require('mongoose');


const basicCapsuleSchema = new Schema({
    color: { type: String, required: true },
});

module.exports = model('BasicCapsule', basicCapsuleSchema );