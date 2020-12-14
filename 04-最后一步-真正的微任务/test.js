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
  resolve('p2..success')
  reject('p2..err')
})

p2.then(res => {
  console.log('成功啦。。。', res)
}, err => {
  console.log('p2..失败啦。。。', err)
})


/********************案例2 promise.all************************************/
let p3 = new Promise((resolve, reject) => { resolve(1000) })
Promise.all([1,2,3, p3]).then(res => {
  console.log('promise.all.success...', res)
}, err => {
  console.log('promise.all.error...', err)
})



/**********************案例3 promise.finally******************************************************/

let p4 = new Promise((resolve, reject) => {
  resolve('p4 success')
})

p4.finally(() => {
  console.log('p4...最终的')
}).then(res => {
  console.log('p4....success', res)
}, err => {
  console.log('p4....error...', err)
}).then((res) => {
  console.log('then..', res)
})


let p5 = new Promise((resolve, reject) => {
  resolve('p5 success')
})

p5.finally(() => {
  console.log('p5...最终的')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 4000)
  })
}).then(res => {
  console.log('p5....success', res)
}, err => {
  console.log('p5....error...', err)
}).then((res) => {
  console.log('then..', res)
})






console.log('===================end==================')


