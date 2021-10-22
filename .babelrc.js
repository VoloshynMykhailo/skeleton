const development = 'development';
const production = 'production';

let plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
];

module.exports = (api) => {
    const env = api.env();

    api.cache.using(() => env === development);

    switch(env) {
        case development:
            // react-hot-loader/babel не обязателен, нужно в основном для классов
            plugins = ['react-hot-loader/babel', ...plugins];
            break;
        case production:
            plugins = [...plugins];
            break;
    }

    return {
        // presets: ['@babel/preset-env'],
        presets: [
            '@babel/preset-react',
            ['@babel/preset-env', {
            debug: false,
            useBuiltIns: "entry"
        }]
        ],
        plugins,
    }
};