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

/**
 * 解析url里面的hash
 * @param {string} hash - 需要解析的hash字符串
 * 
 * @example
 * 
 * wt.url.parseHash('#/a/b/c?d=1&e=2')
 * // => {path: '/a/b/c', params: {d: '1', e: '2'}}
 */
exports.parseHash = (hash) => {
    if (typeof hash !== 'string') return {}
    const path = hash.replace(/^#/, '').replace(/(&|\?).*$/, '')
    const paramStr = hash.replace(/^#/, '').replace(/.*?(&|\?)(.*)$/, '$2')
    const params = {}
    paramStr.split('&').forEach(p => {
        const arr = p.split('=')
        if (arr.length < 2) return
        params[arr[0]] = arr[1]
    })
    return {path, params}
}