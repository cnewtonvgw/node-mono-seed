const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = env => ({
    entry: {
        main: './src/webapp/main.tsx',
    },
    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: '/',
        filename: '[name]' + (isProd(env) ? '-[contenthash].js' : '.js'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.css'],
    },
    target: 'web',
    devtool: isProd(env) ? false : '#source-map',
    optimization: {
        minimizer: (
            isProd(env)
                ? [
                    new UglifyJsPlugin({
                        parallel: true,
                        sourceMap: true, // set to true if you want JS source maps
                    }),
                    new OptimizeCSSAssetsPlugin({}),
                ]
                : []
        ),
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
                    cssLoaderConfig,
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
});

function isProd(env) {
    return env === 'production';
}

const cssLoaderConfig = {
    loader: 'css-loader',
    options: {
        modules: true,
        camelCase: true,
    },
};