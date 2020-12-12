const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

/**
 * 第3节的promise是基于setTimeout的，此时的promise是一个宏任务，而不是微任务。
 * */

const resolvePromise = (promise2, x, resolve, reject) => {
  if(promise2 === x){
    return reject(new TypeError('循环引用。。'))
  }
  if(typeof x === 'object' && x !== null || typeof x === 'function'){
    let called;
    try {
      let then = x.then;// 这里取值有潜在的风险，比如then可能是通过defineProperty定义的。
      if(typeof then === 'function'){
        then.call(x, y => {
          if(called) return;
          called = true;
          // 1.如果y还是一个promise，显然不能直接调用resolve(y)，因此还是要判断y是否
          // 是promise
          //resolve(y)
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if(called) return;
          called = true
          reject(r)
        })
      } else {
        // x: { then: '这就是个普通的then属性' }
        resolve(x);
      }
    } catch (e) {
      if(called) return;
      called = true
      reject(e)
    }
  } else {
    // x普通值
    resolve(x)
  }
}

const nextTick = (fn) => {
  if (process !== undefined && typeof process.nextTick === "function") {
    // node.js环境
    return process.nextTick(fn);
  } else {
    // 浏览器环境，用MutationObserver实现浏览器上的nextTick
    let counter = 1;
    const observer = new MutationObserver(fn);
    let textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true,
    });
    counter += 1;
    textNode.data = String(counter);
  }
}

class MiniPromise {
  constructor(executor){
    this.status = PENDING;
    this.res = undefined;
    this.err = undefined;

    this.onSuccessCallbacks = [];
    this.onErrorCallbacks = [];
    let resolve = (res) => {
      if(this.status !== PENDING) return
      this.status = RESOLVED
      this.res = res
      this.onSuccessCallbacks.forEach(cb => cb())
    }

    let reject = (err) => {
      if(this.status !== PENDING) return
      this.status = REJECTED
      this.err = err
      this.onErrorCallbacks.forEach(cb => cb())
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }

  }

  then(onSuccess, onError){
    onSuccess = typeof onSuccess === 'function' ? onSuccess : data => data;
    onError = typeof onError === 'function' ? onError : err => { throw err };
    let promise2 = new MiniPromise((resolve, reject) => {
      if(this.status === RESOLVED){
        nextTick(() => {
          try {
            const x = onSuccess(this.res)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if(this.status === REJECTED){
        nextTick(() => {
          try{
            const x = onError(this.err)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if(this.status === PENDING){
        this.onSuccessCallbacks.push(() => {
          nextTick(() => {
            try{
              const x = onSuccess(this.res)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })

        this.onErrorCallbacks.push(() => {
          nextTick(() => {
            try{
              const x = onError(this.err)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
}

// 测试脚本
MiniPromise.defer = MiniPromise.deferred = function(){
  let dfd = {}
  dfd.promise = new MiniPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject
  })
  return dfd;
}


module.exports = MiniPromise;
