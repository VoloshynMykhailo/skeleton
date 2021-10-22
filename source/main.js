import "regenerator-runtime/runtime";
import {increase} from './util';

//React
import './react-components/App';

import './styles/common.css';
import './styles/main.css';

//COMMON
const test = 15;
console.log(increase(test), test);

//GLOBAL from webpack
console.log('GLOBAL_VARIABLES', RELEASE, __IS_DEV__, __IS_PROD__, DEV_HOST, DEV_PORT, PROD_HOST);

//CHUNK
setTimeout(async () => {
    try {
        const result = await import(/* webpackChunkName: "firstChunk" */'./components/firstChunk');
        const {simple, fromSimple} = result.default;
        console.log(simple.getCount());
        simple.increment();
        console.log(simple.getCount());
        console.log(fromSimple);
    } catch (e) {
        throw new Error('chunk downloading was failed');
    }

}, 3000);
