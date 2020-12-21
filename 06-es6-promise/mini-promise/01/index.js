const PENDING   = void 0;
const FULFILLED = 1;
const REJECTED  = 2;

let resolve = (promise, value) => {
    if(promise._state !== PENDING){ return }
    promise._result = value;
    promise._state = FULFILLED;
}

let reject = (promise, reason) => {
    if(promise._state !== PENDING) return;
    promise._state = REJECTED;
    promise._result = reason;
}
class MiniPromise{
    constructor(executor){
        this._result = this._state = undefined;
        try {
            executor((value) => {
                resolve(this, value);
            }, (reason) => {
                reject(this, reason);
            });
        } catch(e) {
            reject(this, e);
        }
    }

    then(onFulfillment, onRejection){
        const callback = arguments[this._state - 1]
        callback(this._result);
    }
}


module.exports = MiniPromise;
