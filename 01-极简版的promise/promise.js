const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

class MiniPromise {
  constructor(executor){
    this.status = PENDING;
    this.res = undefined;
    this.err = undefined;

    let resolve = (res) => {
      if(this.status !== PENDING) return
      this.status = RESOLVED
      this.res = res
    }

    let reject = (err) => {
      if(this.status !== PENDING) return
      this.status = REJECTED
      this.err = err
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
    }

    if(this.status === REJECTED){
      onError(this.err)
    }
  }
}


module.exports = MiniPromise;
