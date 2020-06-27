const presets = [
    ['@babel/env', { // The preset env installed
        targets: { // Browser versions to be supported
            edge: '17',
            ie: '11',
            firefox: '50',
            chrome: '64',
            safari: '11.1'
        },

        // Babel uses polyfills from the core-js library
        useBuiltIns: "entry"
    }]
];

module.exports = { presets };