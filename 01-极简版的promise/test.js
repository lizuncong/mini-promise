let Promise = require('./promise')

/**
 * 这个版本的promise只是个极简版的，
 * 1. 目前还是同步的，promise3成功的回调就没有执行。观察控制台输出，可以发现 '====end===' 最后输出。
 * 2. then还不能链式调用
 * */

console.log('=====================start================')

let promise1 = new Promise((resolve, reject) => {
  // throw new Error('失败') // 需要捕获executor里面的错误并调用reject
  console.log('promise1...')
  reject('error')
  resolve('hello')
})


promise1.then(res => {
  console.log('promise1..成功。。', res)
}, err => {
  console.log('promise1..失败...', err)
})

let promise2 = new Promise((resolve, reject) => {
  console.log('promise2...')
  resolve('success');
  reject('error') // 这句代码无效，，，状态一旦改变就不能在改变。
})

promise2.then(res => {
  console.log('promise2..success...', res)
}, err => {
  console.log('promise2..error....', err)
})

// 异步回调，可以发现promise3的resolve没执行成功
let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 3000)
})
promise3.then(res => {
  console.log('promise3...err', res)
}, err => {
  console.log('promise3...err')
})
console.log('===================end==================')
