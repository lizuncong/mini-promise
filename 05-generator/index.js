/**
 * 什么是迭代器。
 * 迭代器默认就是一个对象，具备next方法，调用next方法后返回value和done属性。
 * 迭代器默认部署在[Symbol.iterator]属性上
 * Array.from与[...likeArray]的区别
 * */
// let obj = {0: 1, 1: 2, length: 2};
// console.log(Array.from(obj)); // [1,2]
// console.log([...obj]) // TypeError: obj is not iterable

let obj2 = {
  0: 'a',
  1: 'b',
  length: 2,
  // [Symbol.iterator](){ // 迭代器默认部署在[Symbol.iterator]属性上
  //   let index = 0;
  //   return {
  //     next: ()=>{
  //       return {
  //         value: this[index],
  //         done: this.length === index++,
  //       }
  //     }
  //   }
  // },
  *[Symbol.iterator](){ // 迭代器默认部署在[Symbol.iterator]属性上
    for(let i = 0; i < this.length; i ++){
      yield this[i]
    }
  }
}
console.log(Array.from(obj2)); // ['a','b']
console.log([...obj2]) // ['a', 'b']



/*******************yield and generator**************************************/
function getData() {
  let next = 0;
  return {
    next: function(){
      return next < 4 ? { value: next++, done: false }: { value: undefined, done: true}
    }
  }
}

let data = getData();
console.log(data.next());
console.log(data.next());
console.log(data.next());
console.log(data.next());
console.log(data.next());
console.log(data.next());

function* read(){
  console.log('start');
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

let it = read();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());


/*****************next的传参**************************************/
function* read(){
  let a = yield 'hello'
  console.log('a：', a);
  let b = yield 'world'
  console.log('b：', b)
}
let it1 = read();
console.log(it1.next())
console.log(it1.next())
console.log(it1.next())

let it2 = read();
console.log(it2.next(1))
console.log(it2.next(2))
console.log(it2.next(3))
