/**
 * 将 obj 变成 url 的参数化形式
 * @param {*} obj - 参数化的对象，如果 obj 的属性也是对象，就对属性 JSON 化
 * 
 * @example
 * 
 * wt.url.paramsify({a: 3, b: 4, c: {d: 5}})
 * // => a=3&b=4&c={"d":5}
 */
exports.paramsify = obj => {
    if (typeof obj !== 'object') return ''

    return Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object') return `${key}=${JSON.stringify(obj[key])}`
        return `${key}=${obj[key]}`
    }).join('&')
}