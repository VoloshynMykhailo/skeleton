const {path: PROJECT_ROOT} = require('app-root-path');
const {resolve} = require('path');

   
const SOURCE_DIR = resolve(PROJECT_ROOT, './source');
const BUILD_DIR = resolve(PROJECT_ROOT, './build');
const DIST_DIR = resolve(PROJECT_ROOT, './dist');
const DEV_HOST = 'localhost';
const DEV_PORT = '3000';

module.exports = {
    SOURCE_DIR,
    BUILD_DIR,
    DIST_DIR,
    DEV_HOST,
    DEV_PORT,
};