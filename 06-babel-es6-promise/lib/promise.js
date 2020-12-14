let resolve = (promise, value) => {

}

class MiniPromise{
    constructor(executor){
        try {
            executor(function resolvePromise(value){
                resolve(this, value);
            }, function rejectPromise(reason) {
                reject(this, reason);
            });
        } catch(e) {
            reject(this, e);
        }
    }
}


module.exports = MiniPromise;
