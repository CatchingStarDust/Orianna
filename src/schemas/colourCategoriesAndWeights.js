// Adjusted weights for each color so that the total sums to 1:
// Basic colors total 90%, and the remaining 17 colors share 10% equally.
const coloursAndWeightsList = [
    // Basic (90% total)
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

    // Autumn (4 colors)
    { color: 'scaredy-cat-black', weight: 0.00588235294117647 },
    { color: 'spice-red', weight: 0.00588235294117647 },
    { color: 'jack-o-lantern-orange', weight: 0.00588235294117647 },
    { color: 'harvest-brown', weight: 0.00588235294117647 },

    // Pastel (4 colors)
    { color: 'pastel-blue', weight: 0.00588235294117647 },
    { color: 'pastel-purple', weight: 0.00588235294117647 },
    { color: 'pastel-peach', weight: 0.00588235294117647 },
    { color: 'pastel-pink', weight: 0.00588235294117647 },

    // Holiday (5 colors)
    { color: 'mistletoe-green', weight: 0.00588235294117647 },
    { color: 'ribbon-red', weight: 0.00588235294117647 },
    { color: 'tree-star-yellow', weight: 0.00588235294117647 },
    { color: 'snowflake-white', weight: 0.00588235294117647 },
    { color: 'nerot-blue', weight: 0.00588235294117647 },

    // Valentine (4 colors)
    { color: 'be-mine-pink', weight: 0.00588235294117647 },
    { color: 'chocolate-brown', weight: 0.00588235294117647 },
    { color: 'heartbreak-red', weight: 0.00588235294117647 },
    { color: 'cream-white', weight: 0.00588235294117647 },
];

module.exports.coloursAndWeightsList = coloursAndWeightsList;
