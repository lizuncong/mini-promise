const MiniPromise = require('./index');

let miniP = new MiniPromise((resolve, reject) => {
    resolve('success')
})
miniP.then(res => {
    console.log('成功回调', res)
}, err => {
    console.log('失败回调', err)
})
let miniP2 = new MiniPromise((resolve, reject) => {
    reject('error')
})
miniP2.then(res => {
    console.log('miniP2成功回调', res)
}, err => {
    console.log('miniP2失败回调', err)
})
