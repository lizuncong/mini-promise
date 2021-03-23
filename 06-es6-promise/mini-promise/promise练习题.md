####
```js
console.log('ha1');
setTimeout(() => {
 console.log(7); 
});
new Promise((resolve, reject) => {
    console.log('ha1');
    resolve('test')
})
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });
new Promise((resolve, reject) => {
    console.log('ha2')
    resolve('666')
})
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

```

#### 1. resolve promise自身的几种情况
```js
let pro1 = new Promise((resolve, reject) => {
  resolve(pro1);
})

pro1.then((res) => {
  console.log('pro1..res..', res);
}, err => {
  console.log('pro1..err..', err);
})
```

```js
const pro2 = new Promise((resolve, reject) => {
  resolve(pro2);
})

pro2.then((res) => {
  console.log('pro2..res..', res);
}, err => {
  console.log('pro2..err..', err);
})
```

```js
var pro3 = new Promise((resolve, reject) => {
  resolve(pro3);
})

pro3.then((res) => {
  console.log('pro3..res..', res);
}, err => {
  console.log('pro3..err..', err);
})
```


```js
var pro4 = new Promise((resolve, reject) => {
  setTimeout(() => {
     resolve(pro4); 
  }, 0)
})

pro4.then((res) => {
  console.log('pro4..res..', res);
}, err => {
  console.log('pro4..err..', err);
})
```

#### 2. then方法
1. onFulfilled及onRejected返回值
```js
var p = new Promise((resolve, reject) => {
    resolve('p..success')
});
var p2 = p.then((res) => {
    console.log('p..res', res);
    return 'p.res'; // 如果没有return语句呢？
}, err => {
    console.log('p..err', err);
    return 'p.err';
})
p2.then(res => {
    console.log('p2..res', res);
}, err => {
    console.log('p2..err', err);
})
```
```js
var p = new Promise((resolve, reject) => {
    console.log('第一层')
    resolve('第一层的resolve')
})
.then(res => {
    console.log('p..res', res);
    return new Promise((resolve, reject) => {
        console.log('这是什么');
        resolve('look at this');
    })
}, err => {
    console.log('p..err', err);
})
.then(res => {
    console.log('第三层..res', res);
}, err => {
    console.log('第三层..err', err);
})
```

2.onFulfilled或者onRejected省略的情况
```js
var p = new Promise((resolve, reject) => {
    resolve('p..success')
});
p.then().then().then(res => {
    console.log('p...res', res);
}, err => {
    console.log('p...err', err)
})
// 或者
var p = new Promise((resolve, reject) => {
    reject('p..reject')
});
p.then().then().then(res => {
    console.log('p...res', res);
}, err => {
    console.log('p...err', err)
})
```

3.onFulfilled或者onRejected有异常的情况下
```js
var p = new Promise((resolve, reject) => {
    resolve('p..success');
})
.then((res) => {
    console.log('p..res', res);
    console.log(a + b);
    return 'p.res';
}, err => {
    console.log('p..err', err);
})
.then(res => {
    console.log('p2..res', res);
}, err => {
    console.log('p2..err', err);
})
```

#### promise resolve的过程
1. resolve一个promise
```js
var p = new Promise((resolve, reject) => {
    resolve(new Promise((resolve2, reject2) => {
        resolve2('这是内部的resolve');
    }))
})
p.then(res => {
    console.log('p..res', res);
}, err => {
    console.log('p..err', err);
})
// reject
var p = new Promise((resolve, reject) => {
    reject(new Promise((resolve2, reject2) => {
        resolve2('这是内部的resolve');
    }))
})
p.then(res => {
    console.log('p..res', res);
}, err => {
    console.log('p..err', err);
})
```

```js
var p = new Promise((resolve, reject) => {
    console.log('第一层')
    resolve('第一层的resolve')
})
.then(res => {
    console.log('p..res', res);
    return new Promise((resolve, reject) => {
        console.log('这是什么');
        resolve(
            new Promise((resolve, reject) => {
                 console.log('继续嵌套。。。');
                 reject('经典折磨')
            })
        );
    })
}, err => {
    console.log('p..err', err);
})
.then(res => {
    console.log('第三层..res', res);
}, err => {
    console.log('第三层..err', err);
})
```
2.then 方法链式调用
```js
var p = new Promise((resolve, reject) => {
    console.log('第一层')
    resolve('第一层的resolve')
})
p.then(res => {
    console.log('p..res', res);
    return '第二层..'
}, err => {
    console.log('p..err', err);
})
.then(res => {
    console.log('第三层..res', res);
}, err => {
    console.log('第三层..err', err);
})
```

```js
var p = new Promise((resolve, reject) => {
    console.log('第一层promise');
    resolve(
        new Promise((resolve2, reject2) => {
            console.log('内部的promise');
            resolve2('这是内部的resolve');
        })
        .then(res => {
            console.log('内部的res', res);
            return '搞懂了吗';
        }, err => {
            console.log('内部的err', err);
        })
    )
})
p.then(res => {
    console.log('p..res', res);
}, err => {
    console.log('p..err', err);
})
```

```js
var p = new Promise((resolve, reject) => {
    console.log('第一层promise');
    resolve(
        new Promise((resolve2, reject2) => {
            console.log('内部的promise');
            resolve2('这是内部的resolve');
        })
        .then(res => {
            console.log('内部的res', res);
            return '搞懂了吗';
        }, err => {
            console.log('内部的err', err);
        })
        .then((res) => {
            console.log('第三层res', res);
            return '第三层的onfill返回值'
        }, err => {
            console.log('第三层err', err);
        })
    )
})
p.then(res => {
    console.log('p..res', res);
}, err => {
    console.log('p..err', err);
})
```

#### 
```js
var p = new Promise((resolve, reject) => {
    console.log('1........');
    resolve(
        new Promise((resolve1, reject1) => {
            console.log('2.......');
            resolve1('a')
        })
        .then(res => {
            console.log('3...res', res);
        }, err => {
            console.log('4...err', err);
        })
    );
})
.then(res => {
    console.log('5...', res);
    return new Promise((resolve, reject) => {
               console.log('6....');
               resolve('b')
           })
           .then(res => {
               console.log('7...', res);
               return 'c';
            }, err => {
               console.log('8...', err);
            })
}, err => {
    console.log('9...', err);
}).then(res => {
    console.log('10...', res);
}, err => {
    console.log('11...', err);
})
```
