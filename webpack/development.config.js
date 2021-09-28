const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {SOURCE_DIR, DIST_DIR} = require('./data');

console.log('development config');

// --env param1=one param2=two etc.
module.exports = (env) => {
    console.log('-> ', env);

    return {
        mode: 'development',
        devtool: 'source-map',
        entry: {
            main: resolve(SOURCE_DIR, 'main.js'),
            admin: resolve(SOURCE_DIR, 'admin.js'),
        },
        output: {
            clean: true,
            filename: '[name].js',
            path: DIST_DIR,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
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
};