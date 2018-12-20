const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = env => ({
    entry: {
        server: './src/server/main.ts',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
    },
    target: 'node',
    node: {
        // Need this when working with express
        __dirname: false,
        __filename: false,
    },
    // Prevent bundling of node externals.
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },

        ],
    },
    plugins: [],
});