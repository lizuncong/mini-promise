#### babel中core-js模块实现es6-promise的思路
- 首先确保构造函数是通过 `new` 操作符调用而不是直接调用的。
    ```js
      let p = Promise(() => {}) // 直接报错
      let p2 = new Promise(() => {})
      // 判断方法，在Promise构造函数内调用
     if (!(it instanceof Promise)) {
        throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
      }
    ```
- 判断executor是否为函数，不是函数则直接报错。
```js
let p = new Promise('这是一个字符串，会报错'); // 直接报错。
```
