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

module.exports = weightedRandomSelect;
