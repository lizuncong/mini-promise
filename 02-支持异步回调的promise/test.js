let Promise = require('./promise')

/**
 * 这个版本的promise增强了对异步回调的支持，
 * 1. 目前promise可以支持异步回调了。
 * 2. then还是不能链式调用
 * */

console.log('=====================start================')

let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 3000)
})
promise3.then(res => {
  console.log('promise3...success', res)
}, err => {
  console.log('promise3...error', err)
})
console.log('===================end==================')


