const MiniPromise = require('./index');

let miniP = new MiniPromise((resolve, reject) => {
    resolve(new MiniPromise((resolve2, reject2) => {
        setTimeout(() => {
            resolve2('resolve2..sucess')
        }, 1000)
        // reject2('reject2.error')
    }))
    // setTimeout(() => {
    //     reject('error')
    // }, 1000)
})
miniP
    .then(res => {
        // throw Error('故意的')
        console.log('第一个.res..', res)
        return new MiniPromise((resolve, reject)  => {
            setTimeout(() => {
                reject('return.error')
            }, 1000)
        })
    }, err => {
        console.log('第一个.err..', err)
        return '第一个err'
    })
    .then(res => {
        console.log('第二个.res...', res)
        return '第二个res'
    }, err => {
        console.log('第二个.err...', err)
        return '第二个err'
    })
