const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outDir = path.resolve(__dirname, '../dist/public');

module.exports = env => [{
    name: 'Webapp',
    bail: isProd(env),
    watch: !isProd(env),
    mode: isProd(env) ? 'production' : 'development',
    devtool: isProd(env) ? false : 'inline-source-map',
    entry: {
        main: path.resolve(__dirname, '../src/webapp/main.tsx'),
    },
    output: {
        path: outDir,
        publicPath: '/',
        filename: '[name]' + (isProd(env) ? '-[contenthash].js' : '.js'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.css'],
    },
    target: 'web',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize: true},
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    isProd(env) ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {limit: 4000},
            },
            {
                test: /\.(ttc)$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        // Delete the contents of the output directory before building
        new CleanWebpackPlugin(['*'], {root: outDir}),
        new HtmlWebPackPlugin({
            template: './src/webapp/index.html',
            filename: 'index.html',
            excludeChunks: ['server'], // In case the server chunk somehow ends up attached
        }),
        ...(isProd(env)
                ? [
                    new MiniCssExtractPlugin({
                        filename: '[name]-[contenthash].css',
                    }),
                ]
                : []
        ),
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
        timings: true,
    },
}];

function isProd(env) {
    return env === 'production';
}