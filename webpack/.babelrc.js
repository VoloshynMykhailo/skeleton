module.exports = api => {
    const env = api.env();

    api.cache.using(() => env === 'development');

    return {
        presets: [
            [
                '@babel/preset-env', 
                //TODO watch docs and fix options (except corejs, useBuiltIns)
                {
                    corejs: 3,
                    useBuiltIns: 'usage',
                    shippedProposals: true,
                    targets: {
                        node: 'current'
                    }
                }
            ],
        ]
    }
}