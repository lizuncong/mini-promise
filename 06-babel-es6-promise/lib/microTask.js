let fn = null;
let notify = null;

const flush = () => {
    fn();
}

if (process !== undefined && typeof process.nextTick === "function") {
    // node.js环境
    notify = () => process.nextTick(flush);
} else {
    // 浏览器环境，用MutationObserver实现浏览器上的nextTick
    let toggle = true;
    const observer = new MutationObserver(flush);
    let textNode = document.createTextNode('');
    observer.observe(textNode, {
        characterData: true,
    });
    notify = function () {
        textNode.data = String(toggle = !toggle);
    };
}

exports.microTask = (cb) => {
    fn = cb;
    notify();
};
