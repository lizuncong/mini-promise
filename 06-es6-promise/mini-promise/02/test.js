const MiniPromise = require('./index');

let miniP = new MiniPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})
miniP.then(res => {
    console.log('1成功回调', res)
}, err => {
    console.log('失败回调', err)
})
miniP.then(res => {
    console.log('2成功回调', res)
}, err => {
    console.log('失败回调', err)
})
miniP.then(res => {
    console.log('3成功回调', res)
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
let miniP3 = new MiniPromise((resolve, reject) => {
    setTimeout(() => {
        reject('error')
    }, 1000)
})
miniP3.then(res => {
    console.log('p3.成功回调', res)
}, err => {
    console.log('p3.失败回调', err)
})
miniP3.then(res => {
    console.log('p3.成功回调', res)
}, err => {
    console.log('p3.失败回调', err)
})
miniP3.then(res => {
    console.log('p3.成功回调', res)
}, err => {
    console.log('p3.失败回调', err)
})
