
//the new weights random select
const newWeightedRandomSelect = function weightedRandomSelect(weights) {
    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
    const r = Math.random() * totalWeight;

    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i].weight;
        if (r <= sum) {
            return weights[i].color;
        }
    }
};

// Export the weighted random selector function
const weightedRandomSelect = function weightedRandomSelect(weights) {
    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
    const r = Math.random() * totalWeight;

    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i].weight;
        if (r <= sum) {
            return weights[i].type;
        }
    }
};

module.exports = {
    weightedRandomSelect,
    newWeightedRandomSelect
};
