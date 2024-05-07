const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/discordBotDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  
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

const UserInventory = mongoose.model('UserInventory', userInventorySchema);
