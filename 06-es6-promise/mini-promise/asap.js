let len = 0;
let scheduleFlush;
const isNode = typeof self === 'undefined' && typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]';


if(isNode){
    // node环境
    scheduleFlush = () => process.nextTick(flush)
} else {
    // 浏览器环境
    let iterations = 0;
    const observer = new BrowserMutationObserver(flush);
    const node = document.createTextNode('');
    observer.observe(node, { characterData: true });
    scheduleFlush = () => {
        node.data = (iterations = ++iterations % 2);
    };
}
const queue = new Array(1000);
function flush() {
    for (let i = 0; i < len; i+=2) {
        let callback = queue[i];
        let arg = queue[i+1];

        callback(arg);

        queue[i] = undefined;
        queue[i+1] = undefined;
    }

    len = 0;
}

exports.asap = function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    // 如果在微任务被处理之前同时调用多次asap函数，那么只会在第一次调用时触发微任务，
    // 等主线程空闲后，再处理这个微任务，这个微任务一次性清空queue队列中的所有任务。
    if (len === 2) {
        scheduleFlush();
    }
}

// asap(() => {
//     console.log('任务1')
// })
// asap(() => {
//     console.log('任务2')
// })
// asap(() => {
//     console.log('任务3')
// })
// asap(() => {
//     console.log('任务4')
// })
// asap(() => {
//     console.log('任务5')
// })
//
//
// let now = Date.now()
// console.log('while..before')
// while(Date.now() - now < 2000){}
// console.log('while..after...');
