const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js',
    },
    optimization: {
        minimizer: [new TerserPlugin({})],
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /mode_module/,
                use: [{
                    loader: 'babel-loader',
                }, ],
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }, ],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new WorkboxPlugin.GenerateSW(),
    ],
}