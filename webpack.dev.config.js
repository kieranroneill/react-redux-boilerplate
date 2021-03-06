'use strict';

const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const defaults = require('./config/defaults.json');
const strings = require('./config/strings.json');

const distPath = path.join(__dirname, 'public', 'dist');
const srcPath = path.join(__dirname, 'public', 'src');
const localhost = 'http://localhost:' + defaults.DEFAULT_PORT;

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },

    // Development specific.
    devServer: {
        outputPath: localhost
    },
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/dev-server',
        path.resolve(srcPath, 'index.jsx')
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
                loader: 'file'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass']
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: distPath,
        publicPath: localhost + '/'
    },
    plugins: [
        new CopyWebpackPlugin(
            [{ from: path.resolve(srcPath, 'assets'), to: path.resolve(distPath, 'assets') }]),
        new FaviconsWebpackPlugin({
            logo: path.resolve(srcPath, 'favicon.png'),
            title: strings.APP_TITLE
        }),
        new HtmlWebpackPlugin({
            title: strings.APP_TITLE,
            inject: 'body',
            template: path.resolve(srcPath, 'index.hbs'),
            minify: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin({
            title: 'BOOM!!!',
            contentImage: path.resolve(__dirname, 'unicorn.png'),
            alwaysNotify: true
        })
    ],
    postcss: () => [ autoprefixer({ browsers: ['last 3 versions'] }) ]
};
