const MiniPromise = require('./promise');

//parent._state, child, callback, parent._result

let p = new MiniPromise((resolve, reject) => {
    console.log('new一个promise')
    resolve('success')
})

p.then(res => {
    console.log('p...res', res)
    return res
}, err => {
    console.log('p...err', err)
}).then(res => {}, err => {})
