import webpack from 'webpack';
import chalk from 'chalk'; //расскрашиваем консоль

import {config} from '../production.config'; // func/obj

console.log(chalk.green('START PRODUCTION'));

const compiler = webpack(config);
// compiler.watch({}, (error, stats) => {
compiler.run((error, stats) => {
    // config error
    if (error) {
        console.error(error.stack || error, error.details);
        return null;
    }

    const info = stats.toString({
        hash: false,
        modules: false,
        colors: true,
        version: true,
        env: true,
    });

    console.log(chalk.greenBright('COMPLETED'));
    console.log(info);

    if (stats.hasErrors()) {
        console.log(chalk.redBright('COMPILATION ERROR'));
    }

    if (stats.hasWarnings()) {
        console.log(chalk.yellow('WARNING: FAILED IMPORT, SYNTAX ERROR, ETC.'));
    }
}); 



