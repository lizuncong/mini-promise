const PENDING   = void 0;
const FULFILLED = 1;
const REJECTED  = 2;


let executeSubscribers = (promise) => {
    if(!promise._subscribers.length) return;
    for(let i = 0; i < promise._subscribers.length; i+=3){
        const child = promise._subscribers[i]
        const callback = promise._subscribers[i + promise._state];
        invokeCallback(callback, promise, child);
    }
}
let resolve = (promise, value) => {
    if(promise === value){
        reject(promise, new TypeError("循环引用"))
    } else if(typeof value === 'function' || (typeof value === 'object' && value !== null)){
        let then;
        try {
            then = value.then
        } catch (e) {
            reject(promise, e)
        }
        if(typeof then === 'function'){
            try {
                then.call(value, res => {resolve(promise, res)}, err => { reject(promise, err)})
            } catch (e) {
                reject(promise, value)
            }
        } else {
            fulfill(promise, value)
        }
    } else {
       fulfill(promise, value)
    }
}
let fulfill = (promise, value) => {
    if(promise._state !== PENDING){ return }
    promise._result = value;
    promise._state = FULFILLED;

    executeSubscribers(promise)
}
let reject = (promise, reason) => {
    if(promise._state !== PENDING) return;
    promise._state = REJECTED;
    promise._result = reason;

    executeSubscribers(promise)
}

let invokeCallback = (parentCallback,parent, child) => {
    let x, error, hasCallback = typeof parentCallback === 'function', cbSuccess = true ;
    if(hasCallback){
        try {
            x = parentCallback(parent._result);
        } catch (e) {
            cbSuccess = false;
            error = e;
            // reject(child, e)
        }
    } else {
        x = parent._result;
    }
    if(!cbSuccess){
        reject(child, error)
    } else if(hasCallback){
        resolve(child, x);
    } else if(parent._state === FULFILLED){
        if(child._state !== PENDING){ return }
        child._result = x;
        child._state = FULFILLED;
        executeSubscribers(child)
    } else if(parent._state === REJECTED){
        if(child._state !== PENDING) return;
        child._state = REJECTED;
        child._result = x;
        executeSubscribers(child)
    }
}
class MiniPromise{
    constructor(executor){
        this._result = this._state = undefined;
        this._subscribers = []
        if(!executor) return;
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
        const child = new MiniPromise();
        if(this._state){
            const callback = arguments[this._state - 1]
            invokeCallback(callback, this, child);
        } else {
            const length = this._subscribers.length;
            this._subscribers[length] = child;
            this._subscribers[length + FULFILLED] =  onFulfillment;
            this._subscribers[length + REJECTED] = onRejection;
        }
        return child;
    }
}


module.exports = MiniPromise;
