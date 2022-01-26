// Promise.resolve().then(() => {
//     console.log(0);
//     return Promise.resolve(4);
// }).then((res) => {
//     console.log(res)
// })
// Promise.resolve(Promise.resolve(4)).then((res) => {
//     console.log(0);
//     // return 4;
//     return new Promise((resolve) => { resolve(4) });
// }).then((res) => {
//     console.log('res=====', res)
// }, err => {
//     console.log('err====', err)
// })
// new Promise((resolve, reject) => {
//     console.log(0)
//     resolve(Promise.resolve(Promise.resolve(Promise.resolve(4))))
// }).then(res => {
//     console.log(res)
// })
// Promise.resolve().then(() => {
//     console.log(1);
// }).then(() => {
//     console.log(2);
// }).then(() => {
//     console.log(3);
// }).then(() => {
//     console.log(5);
// }).then(() => {
//     console.log(6);
// })


// const p1 = new Promise((resolve, reject) => {
//     console.log(1)
//     resolve(4)
// })
// const p2 = p1.then(function p1Fullfilled(res){
//     console.log(2)
//     const p21 = new Promise((resolve, reject) => {
//         console.log('2-1')
//         resolve('2-1')
//     })
//     return p21
// })
// const p3 = p2.then(function p2Fullfillled(res){
//     console.log(3)
// })

// const p10 = new Promise((resolve, reject) => {
//     console.log(10)
//     resolve(4)
// })
// const p20 = p10.then(function p10Fullfilled(res){
//     console.log(20)
//     return res
// })
// const p30 = p20.then(function p20Fullfilled(res){
//     console.log(30)
// })


new Promise((resolve) => {
    console.log(1)
    resolve(4)
}).then(res => {
    console.log(2)
    return new Promise(resolve => {
        resolve('2-1')
    }).then(res => res);
}).then(res => {
    console.log(3, res)
})
// [30] res
// 1 10 2 20
new Promise((resolve) => {
    console.log(10)
    resolve(4)
}).then(res => {
    console.log(20)
    return res;
}).then(res => {
    console.log(30)
}).then(res => {
    console.log(40)
}).then(res => {
    console.log(50)
}).then(res => {
    console.log(60)
})