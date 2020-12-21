const PENDING   = void 0;
const FULFILLED = 1;
const REJECTED  = 2;

let publish = (promise) => {
    if(!promise._subscribers.length) return;
    for(let i = 0; i < promise._subscribers.length; i+=2){
        const callback = promise._subscribers[i + promise._state - 1];
        callback(promise._result);
    }
}
let resolve = (promise, value) => {
    if(promise._state !== PENDING){ return }
    promise._result = value;
    promise._state = FULFILLED;

    publish(promise)
}

let reject = (promise, reason) => {
    if(promise._state !== PENDING) return;
    promise._state = REJECTED;
    promise._result = reason;

    publish(promise)
}
class MiniPromise{
    constructor(executor){
        this._result = this._state = undefined;
        this._subscribers = []
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
        if(this._state){
            const callback = arguments[this._state - 1]
            callback(this._result);
        } else {
            const length = this._subscribers.length;
            this._subscribers[length + FULFILLED - 1] =  onFulfillment;
            this._subscribers[length + REJECTED - 1] = onRejection;
        }
    }
}


module.exports = MiniPromise;
