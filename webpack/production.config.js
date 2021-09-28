const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {SOURCE_DIR, BUILD_DIR} = require('./data');

console.log('prosuction config');

module.exports = {
    mode: 'production',
    entry: {
        main: resolve(SOURCE_DIR, 'main.js'),
        admin: resolve(SOURCE_DIR, 'admin.js'),
    },
    output: {
        clean: true,
        filename: '[name].js',
        path: BUILD_DIR,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: './static/main.html',
            title: 'Тестовый заголовок',
            chunks: ['main']

        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: './static/admin.html',
            title: 'Админ заголовок',
            chunks: ['admin']

        })
    ]
}