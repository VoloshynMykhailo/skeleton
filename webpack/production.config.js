import {merge} from 'webpack-merge';
import postcssEnv from 'postcss-preset-env';
import WebpackBar  from 'webpackbar';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import TerserPlugin from 'terser-webpack-plugin';
import { extendDefaultPlugins } from "svgo";

import {commonConfig} from './common.config';

console.log('PRODUCTION CONFIG');

// TODO postcss-simple-vars postcss-import
export const config = merge(commonConfig, {
    // instead of 'production' with built-in optimization do it manually
    // if use 'production', so then there is no necessary for optimization: {}
    mode: 'none',
    output: {
        clean: true
    },
    optimization: {
        nodeEnv: 'production',
        // js minification
        minimize: false, //TODO should be true (temporary false in order to see readable bundle)
        // dependency graph -> compilation process
        // module graph & chunk graph -> output process
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin() //can pass an object with options
        ],
        // stop emit of bundle when error occurs during compilation to avoid failed build on production server
        noEmitOnErrors: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        removeAvailableModules: true,
        // work in complex with providedExports & usedExports
        concatenateModules: true,
        providedExports: true,
        usedExports: true,

        sideEffects: true, // TREE SHAKING; depend on providedExports & usedExports

        moduleIds: 'size', // 'named' for readable module names
        chunkIds: 'size', // 'named' for readable chunk names
        // switched on as default and we only can set options inside objects
        splitChunks: {
            chunks: 'all',
            minSize: 30000, //bytes
            maxAsyncRequests: 5,
            maxInitialRequests: 3,

            cacheGroups: {
                defaultVendors: {
                    // name: 'vendors',
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module
                            .identifier()
                            .split('/')
                            .reduceRight((item) => item);
                        // const allChunksNames = chunks.map((item) => item.name).join('~');
                        // console.log({
                        //     allChunksNames,
                        //     moduleFileName: module.identifier(),
                        // });
                        // return `${cacheGroupKey}_${allChunksNames}-${moduleFileName}`;
                        return `${cacheGroupKey}__${moduleFileName}`;
                    },
                    chunks: 'initial', //rewritten
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2, //separate to chunk only if use at least in 2 different modules
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        // separate webpack-runtime
        runtimeChunk: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            modules: {
                                localIdentName: '[local]-[hash:base64:5]',
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            postcssOptions: {
                                plugins: [
                                    postcssEnv({
                                        stage: 0,  // default stage2; old fashioned postcss-nested
                                    }),
                                ],
                            }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:5].[id].css',
            chunkFilename: 'styles/[name].[contenthash:5].[id].css'

        }),
        // images
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['mozjpeg', { // 'imagemin-mozjpeg' -> 'imagemin-jpegtran' for lossless optimization
                        progressive: true,
                        quality: 60
                    }],
                    ['pngquant', { // 'imagemin-pngquant' -> imagemin-optipng for lossless optimization
                        quality: 60
                    }],
                    [
                        "svgo",
                        {
                            plugins: extendDefaultPlugins([
                                {
                                    name: "removeViewBox",
                                    active: false,
                                },
                                {
                                    name: "addAttributesToSVGElement",
                                    params: {
                                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                    },
                                },
                            ]),
                        },
                    ],
                ]
            }
        }),
        new WebpackBar({}),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            openAnalyzer: false,
            generateStatsFile: true,
        }),
    ]
});