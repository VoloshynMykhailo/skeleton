//What do we need
// - webpack
// - config
// - compiler
// - start

const webpack = require('webpack');
const chalk = require('chalk'); //расскрашиваем консоль

console.log(chalk.green('START without webpack-cli'));
const getConfig = require('../development.config'); // func/obj

const compiler = webpack(getConfig());
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



