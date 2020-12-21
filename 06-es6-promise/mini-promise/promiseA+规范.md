#### 一定要熟读 `promise aplus` 规范
#### 一定要熟读 `promise aplus` 规范
#### 一定要熟读 `promise aplus` 规范
#### 一定要熟读 `promise aplus` 规范
#### 一定要熟读 `promise aplus` 规范
#### 一定要熟读 `promise aplus` 规范

#### 术语
- `promise`是一个拥有`then`方法的对象或者方法
- `thenable` 是一个定义了 `then` 方法的对象或者函数
- `value` 是任意合法的javascript的值，包括 `undefined`、`thenable`、或者 `promise`
- `exception` 通过 `throw` 抛出来的异常
- `reason` 是一个描述 `promise` reject的原因


#### then方法
`promise`的 `then` 方法接收两个参数：
```js
promise.then(onFulfilled, onRejected)
```
- `onFulfilled` 和 `onRejected` 都是可选参数
    + 如果 `onFulfilled` 不是一个函数，则忽略
    + 如果 `onRejected` 不是一个函数，则忽略
- 如果 `onFulfilled` 是一个函数
    + `promise`状态更新为`fulfilled`时，就调用 `onFulfilled`方法，参数为 `promise` 的 `value`
    + `promise` 在状态 `fulfilled` 之前不能调用 `onFulfilled`方法。
    + `onFulfilled` 方法不能被多次调用
- 如果 `onRejected` 是一个函数
    + `promise` 状态更新为 `rejected`时，就调用 `onRejected` 方法，参数为 `promise` 的 `reason`
    + `promise` 状态更新为 `rejected` 之前不能调用 `onRejected` 方法
    + `onRejected`不能被多次调用
- `onFulfilled` 或者 `onRejected` 方法必须放在微任务队列中处理，不能在当前执行环境中调用。
- `onFulfilled` 或者 `onRejected` 方法里面的 `this` 要么为 `undefined`，要么为 全局作用域 `window` 或者 `global`
- 一个 `promise` 的 `then` 方法可能会被多次调用
    + 如果 `promise` 状态为 `fulfilled`， 则依次调用所有的 `onFulfilled` 回调。
    + 如果 `promise` 状态为 `rejected`， 则依次调用所有的 `onRejected` 回调。
- `then` 方法必须返回一个 `promise`
    ```js
    let promise1 = new Promise((resolve, reject) => { resolve('success') })
    let promise2 = promise1.then(onFulfilled, onRejected)
    ```
    + 如果 `onFulfilled` 或者 `onRejected` 执行完成并返回一个 value `x`，则执行 `promise 解析程序`，`[[Resolve]](promise2, x)`
    + 如果 `onFulfilled` 或者 `onRejected` 抛出一个异常 `e`，则 `promise2`必须 `reject(e)`，此时 `promise2`状态为`rejected` 。
    + 如果 `onFulfilled`不是一个函数，并且 `promise1`状态更新为 `fulfilled`，则将 `promise1` 的 `value` 传递给 `promise2`，并且更新 `promise2`状态为`fulfilled`。
    + 如果 `onRejected` 不是一个函数，并且 `promise1`状态更新为 `rejected`，则将 `promise1` 的 `reason` 传递给 `promise2`，并且更新 `promise2`状态为`rejected`

#### promise 解析程序
```js
let promise1 = new Promise((resolve, reject) => {
    resolve(x)
})
let promise2 = promise1.then(res => {
    console.log('res..')
    return x
}, err => {
    console.log('x')
    return x;
})
[[Resolve]](promise, x)
```
- 如果 `x` 也是一个 `promise2`，则`promise`采用 `x` 的状态。
- 执行 `[[Resolve]](promise, x)`的过程：
    + 如果 `promise` 和 `x` 是同一个对象，则更新 `promise` 的状态为 `rejected`
    + 如果 `x` 状态更新成 `fulfilled`，则将 `x`的`value`传递给`promise`并更新`promise`的状态为`fulfilled`
    + 如果 `x` 状态更新成 `rejected`，则将 `x`的`reason`传递给`promise`并更新`promise`的状态为`rejected`


#### 个人总结
- 首先要解析promise，promise resove(value)中，value可能也是一个promise，因此需要解析.
- `resolve(value)` 和 `result = onFulfilled()` 需要对 `value` 和 `result` 进行解析，判断是否是promise。
- `reject(reason)` 和 `result = onRejection()` 都不需要解析。
