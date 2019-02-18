const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outDir = path.join(__dirname, '../dist');

module.exports = env => [{
    name: 'Server',
    bail: isProd(env),
    watch: !isProd(env),
    mode: isProd(env) ? 'production' : 'development',
    entry: {
        server: path.resolve(__dirname, '../src/server/main.ts'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: outDir,
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
    plugins: [
        // Delete the contents of the output directory before building (excluding the output of the client build)
        new CleanWebpackPlugin(['!(public)'], {root: outDir}),
    ],
    stats: {
        // Copied from 'minimal' webpack preset https://github.com/webpack/webpack/blob/master/lib/Stats.js#L1397-L1404
        all: false,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        // Display the time to differentiate continuous builds
        builtAt: true,
    },
}];

function isProd(env) {
    return env === 'production';
}