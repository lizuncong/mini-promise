let Promise = require('./promise')

/**
 * 这个版本的promise增强了then方法的实现
 * 1. 如果一个promise的then方法中的函数(成功和失败)返回的结果是一个promise的话，会自动将这个promise执行，并且采用它的状态，
 *    如果成功会将成功的结果向外层的下一个then传递。如果返回的是一个普通值，那么会将这个普通值作为下一次的成功的结果
 * */

console.log('=====================start================')
setTimeout(() => {
  console.log('定时器紧接着end输出，显然这个promise是一个宏任务。。。')
}, 0)
const read = (data) => {
  return new Promise((resolve, reject) => {
    if(data % 2){
      resolve('成功啦')
    } else {
      reject('报错啦。。')
    }
  })
}

read(3)
    .then(res => {
      console.log('成功的回调。。。。', res)
      return read(2)
    }, err => {
      console.log('失败的回调..', err)
    })
    .then(res => {
        console.log('第二个then成功的回调..', res)
    }, err => {
        console.log('第二个then失败的回调..', err)
      return 'error from second then'
    }).then(res => {
        console.log('最后一个then成功的回调...', res)
    }, err => {
        console.log('最后一个then失败的回调', err)
    })

/**************案例2 如果then中抛错******************/
let promise = new Promise((resolve, reject) => {
  resolve('promise..success')
})

let promise2 = promise.then(res => {
  throw new Error('报错了');
})

promise2.then(res => {
  console.log('promise2..sucess', res)
}, err => {
  console.log('promise2..error', err)
})

/***************案例3 then里面的返回值循环引用*************************************/
let p4 = new Promise((resolve, reject) => {
  resolve('success')
})

let p5 = p4.then(() => {
  return p5; // 错误，返回值不能是同一个引用。
})

p5.then(null, err => {
  console.log('p5...报错了。。。', err)
})

/****************案例4 resolve的值还是一个promise的极端情况***************************************************************/
let p6 = new Promise((resolve, reject) => {
  resolve(100);
})

let p7 = p6.then(res => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Promise((resolve1, reject1) => {
        setTimeout(() => {
          resolve1('1000')
        }, 1000)
      }))
    }, 1000)
  })
})

p7.then(res => {
  console.log('p7...succes..', res)
}, err => {
  console.log('p7....errr...', err)
})

/*******************案例5 then参数缺省**********************************************/
let p8 = new Promise((resolve, reject) => {
  resolve('p8...success')
})

p8.then().then().then().then().then( res => {
  console.log('p8...success...', res)
})

let p9 = new Promise((resolve, reject) => {
  reject('p9..error')
})

p9.then().then().then().then().then( res => {
  console.log('p9...success...', res)
}, err => {
  console.log('p9...error...', err)
})



/*********************案例6 测试***************************************************************/
// 借助promises-aplus/promises-tests这个仓库对自写的promise进行测试

Promise.defer = Promise.deferred = function(){
  let dfd = {}
  new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject
  })
  return dfd;
}









console.log('===================end==================')


