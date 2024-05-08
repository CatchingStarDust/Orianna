const mongoose = require('mongoose');

//inventory schema
const userInventorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    capsules: [
        {
            capsuleType: { type: String, required: true },
            quantity: { type: Number, required: true, default: 0 }
        }
    ]
});

const userInventory = mongoose.model('userinventoryDB', userInventorySchema);

module.exports = { userInventory };
