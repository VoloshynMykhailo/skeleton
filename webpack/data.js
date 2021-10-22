import {path as PROJECT_ROOT} from 'app-root-path';
import {resolve} from 'path';

const SOURCE_DIR = resolve(PROJECT_ROOT, './source');
const DIST_DIR = resolve(PROJECT_ROOT, './dist');
const DEV_HOST = 'localhost';
const DEV_PORT = '3000';
const PROD_HOST = 'https://example.com';

export {
    SOURCE_DIR,
    DIST_DIR,
    DEV_HOST,
    DEV_PORT,
    PROD_HOST,
};