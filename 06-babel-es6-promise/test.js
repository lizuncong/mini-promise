const MiniPromise = require('./lib/promise');

let p = new MiniPromise((resolve, reject) => {
    console.log('new一个promise')
})

console.log('p...', p);
