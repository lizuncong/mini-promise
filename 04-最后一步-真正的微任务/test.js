let Promise = require('./promise')

/**
 * 第三节的promise虽然功能基本满足了，但是是基于setTimeout的，也就是说此时的promise还是一个宏任务，
 * 而不是微任务。
 * */
console.log('=====================start================')

setTimeout(() => {
  console.log('定时器最后执行')
}, 0)

let p = new Promise((resolve, reject) => {
  console.log('定义一个promise...')
  resolve('success')
})

p.then(res => {
  console.log('成功啦。。。', res)
}, err => {
  console.log('失败啦。。。', err)
})

let p2 = new Promise((resolve, reject) => {
  console.log('定义一个promise2...')
  reject('p2..err')
})

p2.then(res => {
  console.log('成功啦。。。', res)
}, err => {
  console.log('p2..失败啦。。。', err)
})
console.log('===================end==================')


