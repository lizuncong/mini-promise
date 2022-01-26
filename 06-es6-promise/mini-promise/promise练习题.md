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
// 或者
var p = new Promise((resolve, reject) => {
    reject('p..reject')
});
p.then('abc', 'efg').then().then(res => {
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

### 下面的都是Promise中几个高难度的题目
#### 题目1
```js
new Promise((resolve) => {
    console.log(1)
    resolve(4)
}).then(res => {
    console.log(2)
    return res;
}).then(res => {
    console.log(3)
})

new Promise((resolve) => {
    console.log(10)
    resolve(4)
}).then(res => {
    console.log(20)
    return res;
}).then(res => {
    console.log(30)
})
```
打印顺序： 1 10 2 20 3 30

我们将这个转换成下面这段代码一窥究竟：
```js
const p1 = new Promise((resolve, reject) => {
    console.log(1)
    resolve(4)
})
const p2 = p1.then(function p1Fullfilled(res){
    console.log(2)
    return res
})
const p3 = p2.then(function p2Fullfillled(res){
    console.log(3)
})

const p10 = new Promise((resolve, reject) => {
    console.log(10)
    resolve(4)
})
const p20 = p10.then(function p10Fullfilled(res){
    console.log(20)
    return res
})
const p30 = p20.then(function p20Fullfilled(res){
    console.log(30)
})
```
下面按顺序执行代码，记住，所有的then注册的回调都是在微任务队列中执行的

先执行同步任务：
- p1 执行器是同步执行，因此打印1，并且 p1状态改变成fullfilled
- p1.then返回一个promise，即p2，由于p1状态已经改变，因此将p1的onFullfilled回调，即p1Fullfilled放入微任务队列中，此时微任务队列：`[p1Fullfilled]`
- p2.then返回一个promise，即p3，由于p2的状态此时还是pending状态，因此p2的onFullfilled回调，即p2Fullfillled只会存入p2的回调列表中，而不是放入微任务队列
- new Promise返回一个promise，即p10，同时打印10，并且p10状态变成fullfilled
- p10.then返回一个promise，即p20，由于p10状态已改变，因此将p10的onFullfilled回调，即p10Fullfilled放入微任务队列中，此时微任务队列：
`[p1Fullfilled, p10Fullfilled]`
- p20.then返回一个promise，即p30，由于p20的状态此时还是pending状态，因此p2的onFullfilled回调，即p20Fullfilled只会存入p20的回调列表中，而不是放入微任务队列
- 至此所有同步任务已经执行完成，下面开始执行微任务队列中的任务：
- 从微任务队列中取出p1Fullfilled并且执行，此时打印2，并且p2状态改变，因此将p2的回调放入微任务队列中，此时微任务队列：`[p10Fullfilled, p2Fullfillled]`
- 从微任务队列中取出p10Fullfilled并执行，此时打印20，并且p20状态改变，因此将p20的回调放入微任务队列中，此时微任务队列：`[p2Fullfillled, p20Fullfilled]`
- 重复上述步骤，依次执行p2Fullfillled，p20Fullfilled

#### 题目2
```js
new Promise((resolve) => {
    console.log(1)
    resolve(4)
}).then(res => {
    console.log(2)
    return new Promise(resolve => {
        console.log('2-1');
        resolve('2-1')
    });
}).then(res => {
    console.log(3)
})

new Promise((resolve) => {
    console.log(10)
    resolve(4)
}).then(res => {
    console.log(20)
    return res;
}).then(res => {
    console.log(30)
})
```
转换成下面的代码：
```js
const p1 = new Promise((resolve, reject) => {
    console.log(1)
    resolve(4)
})
const p2 = p1.then(function p1Fullfilled(res){
    console.log(2)
    const p21 = new Promise((resolve, reject) => {
        console.log('2-1')
        resolve('2-1')
    })
    return p21
})
const p3 = p2.then(function p2Fullfillled(res){
    console.log(3)
})

const p10 = new Promise((resolve, reject) => {
    console.log(10)
    resolve(4)
})
const p20 = p10.then(function p10Fullfilled(res){
    console.log(20)
    return res
})
const p30 = p20.then(function p20Fullfilled(res){
    console.log(30)
})
```
这里打印顺序：1 10 2 2-1 20 30 3。

执行思路可以参考题目一拆解，这里需要额外注意的是，p1Fullfilled执行完返回的是promise p21，但此时p2的状态还不会改变，还是pending状态，此时
Promise内部会调用p21的then方法获取p21的状态并传递给p2，因此解析p21状态的这个任务会放入微任务队列中，也就是说，我们可以将上面的过程看成下面这样：
```js
new Promise((resolve) => {
    console.log(1)
    resolve(4)
}).then(res => {
    console.log(2)
    return new Promise(resolve => {
        console.log('2-1');
        resolve('2-1')
    });
    // 和下面的返回效果相同
    // return new Promise(resolve => {
    //     console.log('2-1');
    //     resolve('2-1')
    // }).then(res => res);
}).then(res => {
    console.log(3)
})
// 可以看成下面的过程，then里面返回promise相当于delay两次then()的调用
new Promise((resolve) => {
    console.log(1)
    resolve(4)
}).then(res => {
    console.log(2)
    return '2-1'
}).then(res => res).then(res => res).then(res => {
    console.log(3)
})
```

#### 题目3
```js
new Promise((resolve) => {
    console.log(1)
    resolve(4)
}).then(res => {
    console.log(2)
    return new Promise(resolve => {
        resolve('2-1')
    }).then(res => res).then(res => res);
}).then(res => {
    console.log(3, res)
})
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
```
#### 题目4
```js
Promise.resolve(Promise.resolve(4)).then((res) => {
    console.log(0);
    // return 4; // 对比一下这两种返回值的不同
    return new Promise((resolve) => { resolve(4) });
}).then((res) => {
    console.log(res)
}, err => {
    console.log(err)
})
Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
})
```

#### 题目5
```js
Promise.resolve(Promise.resolve(4)).then((res) => {
    console.log(0);
    return new Promise((resolve) => { resolve(4) });
}).then((res) => {
    console.log(res)
}, err => {
    console.log(err)
})
Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
})
```



```js
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
})
```
打印顺序：0 1 2 3 4 5 6