var webpack = require("webpack");

module.exports = {
    entry: './index.js',
    output: {
        path: './dist/',
        library: 'EmojiAuth',
        filename: 'emoji-auth.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                'presets': ['es2015']
            }
        }]
    },
    node: {
        fs: 'empty'
    },
    externals: {
        bindings: true
    }
}