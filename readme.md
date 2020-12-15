#### 目录
- 01-极简版的promise。一个简单的，同步的promise。不支持异步resolve 或者 reject。
    ```js
      // 尚未支持以下用法
      let p = new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve('success');
              //reject('error'); 
          }, 1000)  
      })
    ```
- 02-支持异步回调的promise。支持异步resolve 或者 reject。只是目前的then还不能链式调用。
    ```js
      // 终于支持异步resolve或者reject了。
      let p = new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve('success');
              //reject('error'); 
          }, 1000)  
      })
    ```
- 03-then的实现。then方法返回promise，支持链式调用。目前的Promise还是宏任务
- 04-最后一步-真正的微任务。使用MutationObserver代替setTimeout以支持微任务。
- 05-generator。简单介绍了 `迭代器`，`generator`，`async`。怎么用generator和迭代器，promise 组合实现async await。
- 06-es6-promise。这部分主要是[es6-promise](https://github.com/stefanpenner/es6-promise)核心源码的实现。


promise的优点
- 可以解决异步嵌套问题
- 可以觉得多个异步并发问题

promise的缺点
- promise基于回调的
- promise无法终止异步


promise的特点
- promise有三个状态


点击[查看](https://promisesaplus.com/) promise A+ 规范。

最终实现的promise代码在 `04-最后一步-真正的微任务` 目录下。


可以借助 `promises-aplus-tests` 这个库对自己写的promise进行测试

运行 `npm run test` 可以测试 `03-then的实现` 目录下的 promise

运行 `npm run test-04` 可以测试 `04-最后一步-真正的微任务` 目录下的 promise

`03-then的实现` 的 promise 是个宏任务

`04-最后一步-真正的微任务` 的promise 是个微任务。
