// 判断实例it是否是Constructor的实例。
exports.anInstance = (it, Constructor, name) => {
    if (!(it instanceof Constructor)) {
        throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
}
