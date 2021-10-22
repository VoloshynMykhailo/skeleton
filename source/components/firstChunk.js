class Simple {
    private = 'private';

    constructor(count) {
        this.count = count;
    }

    getCount() {
        return this.count;
    }

    increment() {
        this.count ++;
    }
}

const simple = new Simple(5);
const fromSimple = 2;

console.log('test chunkRuntime');

export default {
    simple,
    fromSimple,
}