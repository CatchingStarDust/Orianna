
/**the weights without any bonuses */
// the weight of each color
const coloursAndWeights = [
    // basic  (90% total, 0.09 each)
    { color: 'red', weight: 0.09 },
    { color: 'orange', weight: 0.09 },
    { color: 'yellow', weight: 0.09 },
    { color: 'green', weight: 0.09 },
    { color: 'blue', weight: 0.09 },
    { color: 'purple', weight: 0.09 },
    { color: 'pink', weight: 0.09 },
    { color: 'seafoam', weight: 0.09 },
    { color: 'grey', weight: 0.09 },
    { color: 'slate', weight: 0.09 },
    // autumn  (1/512 each)
    { color: 'scaredy-cat-black', weight: 0.001953125 },
    { color: 'spice-red', weight: 0.001953125 },
    { color: 'jack-o-lantern-orange', weight: 0.001953125 },
    { color: '-brown', weight: 0.001953125 },
    // pastel colors (1/512 each)
    { color: 'pastel-blue', weight: 0.001953125 },
    { color: 'pastel-purple', weight: 0.001953125 },
    { color: 'pastel-peach', weight: 0.001953125 },
    { color: 'pastel-pink', weight: 0.001953125 },
];


module.exports.baseCategoryWeights = coloursAndWeights;