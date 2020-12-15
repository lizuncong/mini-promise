const { nextId } = require('../util');
const PENDING   = void 0;
const FULFILLED = 1;
const REJECTED  = 2;

//_state, child, callback, parent._result
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
        this.promiseId = nextId();
        this._result = this._state = undefined;
        this._subscribers = [];
        try {
            executor((value) => {
                resolve(this, value);
            }, (reason) => {
                reject(this, reason);
            });
        } catch(e) {
            console.log('报错了...', e)
            reject(this, e);
        }
    }

    then(onFulfillment, onRejection){
        console.log('...', new this.constructor())
    }
}


module.exports = MiniPromise;
