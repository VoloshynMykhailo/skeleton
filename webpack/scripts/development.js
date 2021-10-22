import webpack from 'webpack';
import devServer from 'webpack-dev-server'
import hot from 'webpack-hot-middleware';
import chalk from 'chalk'
import openBrowser from 'react-dev-utils/openBrowser';

import {DEV_HOST, DEV_PORT} from '../data';
import {config} from '../development.config';

console.log(chalk.green('START DEVELOPMENT'));

const compiler = webpack(config);
const server = new devServer({
    host: DEV_HOST,
    port: DEV_PORT,
    // historyApiFallback: true, // redirect everything to index (for SPA)
    client: {
        overlay: true,
    },
    onAfterSetupMiddleware: (devServer) => {
        devServer.app.use(hot(compiler, {log: false}))
    },
}, compiler);

server.startCallback(() => {
    console.log(chalk.greenBright(`server listening on http://${DEV_HOST}:${DEV_PORT}`));
    openBrowser(`http://${DEV_HOST}:${DEV_PORT}`);
});