
/**the weights without any bonuses */
// the weight of each color
const coloursAndWeights = [
    //basic 
    { color: 'red', weight: 0.04 },
    { color: 'orange', weight: 0.04 },
    { color: 'yellow', weight: 0.04 },
    { color: 'green', weight: 0.04 },
    { color: 'blue', weight: 0.04 },
    { color: 'purple', weight: 0.04 },
    { color: 'pink', weight: 0.04 },
    { color: 'seafoam', weight: 0.04 },
    { color: 'grey', weight: 0.04 },
    { color: 'slate', weight: 0.04 },
    //autumn 
    { color: 'scaredy-cat-black', weight: 0.01 },
    { color: 'spice-red', weight: 0.01 },
    { color: 'jack-o-lantern-orange', weight: 0.01 },
    { color: 'harvest-brown', weight: 0.01 },
    //holiday 
    { color: 'mistletoe-green', weight: 0.005 },
    { color: 'tree-star-yellow', weight: 0.005 },
    { color: 'ribbon-red', weight: 0.005 },
    { color: 'snowflake-white', weight: 0.005 },
    //pastel 
    { color: 'pastel-blue', weight: 0.0025 },
    { color: 'pastel-purple', weight: 0.0025 },
    { color: 'pastel-peach', weight: 0.0025 },
    { color: 'pastel-pink', weight: 0.0025 },
    // Additional colors here
];

module.exports.baseCategoryWeights = coloursAndWeights;