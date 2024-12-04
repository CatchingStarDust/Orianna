// Adjusted weights for each color
const coloursAndWeightsList = [
    // Basic (90% total, )
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

    // Autumn (4 colors, each 1/512 )
    { color: 'scaredy-cat-black', weight: 0.001953125 },
    { color: 'spice-red', weight: 0.001953125 },
    { color: 'jack-o-lantern-orange', weight: 0.001953125 },
    { color: 'brown', weight: 0.001953125 },

    // Pastel (4 colors, each 1/512 )
    { color: 'pastel-blue', weight: 0.001953125 },
    { color: 'pastel-purple', weight: 0.001953125 },
    { color: 'pastel-peach', weight: 0.001953125 },
    { color: 'pastel-pink', weight: 0.001953125 },

    // Holiday (5 colors, each 1/512 )
    { color: 'mistletoe-green', weight: 0.001953125 },
    { color: 'ribbon-red', weight: 0.001953125 },
    { color: 'tree-star-yellow', weight: 0.001953125 },
    { color: 'snowflake-white', weight: 0.001953125 },
    { color: 'nerot-blue', weight: 0.001953125 },
];

module.exports.coloursAndWeightsList = coloursAndWeightsList;
