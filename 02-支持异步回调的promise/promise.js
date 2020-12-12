const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class MiniPromise {
  constructor(executor){
    this.status = PENDING;
    this.res = undefined;
    this.err = undefined;

    this.onSuccessCallbacks = []; // 成功的回调的数组
    this.onErrorCallbacks = []; // 失败的回调的数组
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
    if(this.status === RESOLVED){
      onSuccess(this.res)
    } else if(this.status === REJECTED){
      onError(this.err)
    }

    // 异步回调，此时状态还处于pending中
    if(this.status === PENDING){
      // 这样子添加，不方便传参
      // this.onSuccessCallbacks.push(onSuccess)

      // 这样子添加，方便传参
      this.onSuccessCallbacks.push(() => {
        onSuccess(this.res)
      })

      this.onErrorCallbacks.push(() => {
        onError(this.err)
      })
    }

  }
}


module.exports = MiniPromise;
