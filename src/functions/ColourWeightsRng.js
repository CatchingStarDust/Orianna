// Function to calculate the weight of each color
const calculateWeights = () => {
    const weights = [];

    //  weights for basic colors
    colourCategories.basic.forEach(color => {
        weights.push({ type: color, weight: baseCategoryWeights.basic / colourCategories.basic.length });
    });

    //  weights for autumn colors
    colourCategories.autumn.forEach(color => {
        weights.push({ type: color, weight: baseCategoryWeights.autumn / colourCategories.autumn.length });
    });

    //  weights for holiday colors
    colourCategories.holiday.forEach(color => {
        weights.push({ type: color, weight: baseCategoryWeights.holiday / colourCategories.holiday.length });
    });

    //  weights for pastel colors
    colourCategories.pastel.forEach(color => {
        weights.push({ type: color, weight: baseCategoryWeights.pastel / colourCategories.pastel.length });
    });

    return weights;
}

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
    calculateWeights
};
