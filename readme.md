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
