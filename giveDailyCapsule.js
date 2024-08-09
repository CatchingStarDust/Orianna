
// function to select a weighted random capsule type
function weightedRandomSelect(weights) {
    let sum = 0;
    const r = Math.random();

    for (let i = 0; i < weights.length; i++) {
        sum += weights[i].weight;
        if (r <= sum) {
            return weights[i].type;
        }
    }
};

// Define the probabilities for each capsule type
    const capsuleWeights = [
        { type: 'basicCapsule', weight: 0.50 },
        { type: 'holidayCapsule', weight: 0.30 },
        { type: 'autumnCapsule', weight: 0.20 }
];

// give the user the capsule they pulled

    const selectedCapsuleType = weightedRandomSelect(capsuleWeights);     

    switch(selectedCapsuleType){
        case 'BasicCapsule': {
            //Add capsule to the user's database
            //save the result

        UserProfile.findOneAndUpdate(
            { userId: userId },
            { $inc: { basicCapsules: 1 } },
            { new: true }
    )}
        case 'HolidayCapsule': {
            UserProfile.findOneAndUpdate(
                { userId: userId },
                { $inc: { holidayCapsule: 1 } },
                { new: true }    
    )}
        case 'AutumnCapsule': {
            UserProfile.findOneAndUpdate(
                { userId: userId },
                { $inc: { autumnCapsule: 1 } },
                { new: true }    
    )}
    break;
    }

    console.log({ content: `You have collected your daily reward and received a ${selectedCapsuleType}!`});



