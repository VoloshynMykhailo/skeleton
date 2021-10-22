import { HotModuleReplacementPlugin } from 'webpack';
import {merge} from 'webpack-merge';
import postcssEnv from 'postcss-preset-env';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import {commonConfig} from './common.config';

console.log('DEVELOPMENT CONFIG');

export const config = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
        main: [
            // Runtime code for hot module replacement
            'webpack/hot/dev-server.js',
            // Dev server client for web socket transport, hot and live reload logic
            'webpack-dev-server/client/index.js?hot=true&live-reload=true',
            // 'webpack-hot-middleware/client?reload=true&live-reload=true',
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: '[local]-[hash:base64:5]',
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    postcssEnv({
                                        stage: 0,
                                    })
                                ]
                            }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ]
});