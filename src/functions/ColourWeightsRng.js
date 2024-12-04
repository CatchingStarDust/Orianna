
//weighted random select for colours
const WeightedRandomSelectColour = function weightedRandomSelect(weights) {
    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
    const randomNumber = Math.random() * totalWeight;

    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i].weight;
        if (randomNumber <= sum) {
            return weights[i].color;
        }
    }
};

const WeightedRandomSelectTenPull = function weightedRandomSelect(weights) {
    
    const validWeights = weights.filter(item => item.weight > 0);

    if (validWeights.length === 0) {
        throw new Error("No valid weights provided.");
    }
    
    const totalWeight = validWeights.reduce((sum, item) => sum + item.weight, 0);
    
    const randomNumber = Math.random() * totalWeight;

    let sum = 0;
    for (const item of validWeights) {
        sum += item.weight;
        if (randomNumber <= sum) {
            return item.color; 
        }
    }

    throw new Error("Selection failed due to unexpected logic error.");
};


// Weighted random select for capsules
const weightedRandomSelectItem = function weightedRandomSelect(weights) {
    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
    const randomNumber = Math.random() * totalWeight;

    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i].weight;
        if (randomNumber <= sum) {
            return weights[i].type;
        }
    }
};
module.exports = { WeightedRandomSelectColour, weightedRandomSelectItem, WeightedRandomSelectTenPull};
