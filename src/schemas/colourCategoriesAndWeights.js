
/**the weights without any bonuses */
const baseCategoryWeights = {
    basic: 0.05,    // 5% chance spread among basic colors
    autumn: 0.02,   // 2% chance spread among autumn colors
    holiday: 0.02,  // 2% chance spread among holiday colors
    pastel: 0.01,   // 1% chance spread among pastel colors
};

/** all colours that exist in the game */
const colourCategories = {
    basic: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'seafoam', 'grey', 'slate'],
    autumn: ['scaredy-cat-black', 'spice-red', 'jack-o-lantern-orange', 'harvest-brown'],
    holiday: ['mistletoe-green', 'tree-star-yellow', 'ribbon-red', 'snowflake-white'],
    pastel: ['pastel-blue', 'pastel-purple', 'pastel-peach', 'pastel-pink'],
    /** future colours here */
};

module.exports.baseCategoryWeights = baseCategoryWeights;
module.exports.colourCategories = colourCategories;