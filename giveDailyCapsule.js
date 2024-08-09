
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
}
// Define the probabilities for each capsule type
    const capsuleWeights = [
        { type: 'BasicCapsule', weight: 0.50 },
        { type: 'HolidayCapsule', weight: 0.30 },
        { type: 'AutumnCapsule', weight: 0.20 }
];

// Select a random capsule type based on weights
    const selectedCapsuleType = weightedRandomSelect(capsuleWeights);     

    console.log({ content: `You have collected your daily reward and received a ${selectedCapsuleType}!`});

