import {DefinePlugin} from 'webpack';
import {resolve} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {SOURCE_DIR, DIST_DIR, DEV_HOST, DEV_PORT, PROD_HOST} from './data';

const {NODE_ENV} = process.env;
const __IS_DEV__ = NODE_ENV === 'development';
const __IS_PROD__ = NODE_ENV === 'production';

export const commonConfig = {
    entry: {
        main: [resolve(SOURCE_DIR, 'main.js')],
        admin: [resolve(SOURCE_DIR, 'admin.js')],
    },
    output: {
        filename: 'scripts/[name].[chunkhash].[id].js',
        chunkFilename: 'scripts/chunks/[name].[chunkhash].[id].js',
        path: DIST_DIR,
        publicPath: '/',
        hashDigestLength: 5, //instead of [contenthash:5] / [chunkhash:5]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {}
                }
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]'
                }
                // old-fashioned webpack 4
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: 'images/[name].[ext]' //or can use original path [path][name].[ext]
                //         }
                //     }
                // ]
            },
            {
                test: /\.(ttf|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './source/static/main.html',
            title: 'Тестовый заголовок',
            chunks: ['main']

        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: './source/static/admin.html',
            title: 'Админ заголовок',
            chunks: ['admin']

        }),
        // Global variables, just like CONFIG
        new DefinePlugin({
            RELEASE: '2.1', //TODO take from git commit name
            DEV_HOST: JSON.stringify(DEV_HOST),
            DEV_PORT: JSON.stringify(DEV_PORT),
            PROD_HOST: JSON.stringify(PROD_HOST),
            __IS_DEV__,
            __IS_PROD__,
        })
    ]
};