exports.json = require('./json/index')
exports.time = require('./time/index')
exports.url = require('./url/index')
exports.run = require('./run/index')

/**
 * 根据 propsPath 获取 obj 对象中相应的属性值
 * @param {Object} obj - 被搜索的对象
 * @param {string} propsPath - 属性路劲，例如：'a.b.c'
 * @param {*} defaultValue - 如果没有找到对应的属性值，返回的默认值
 * @example
 * 
 * wt.get({a: {b: {c: 3}}}, 'a.b.c', 5)
 * // => 3
 * 
 * wt.get({a: {b: {c: 3}}}, 'a.b.c.d.e', 5)
 * // => 5
 */
exports.get = (obj, propsPath, defaultValue) => {
    if (typeof propsPath !== 'string') return defaultValue
    if (typeof obj !== 'object') return defaultValue

    const propses = propsPath.split('.')
    let result = obj
    try {
        for (const props of propses) {
            result = result[props]
        }
        return result
    } catch (e) {
        return defaultValue
    }
}

/**
 * 将 obj 中值为 value 的属性剔除掉
 * @param {Object} obj - 需要剔除属性的对象
 * @param {*} value - 具有 value 值的属性将会被剔除掉, 默认值是 undefined
 * @param {boolean} deep - 保留字段，暂未使用
 * @example
 * 
 * wt.shrink({a: 3, b: 4, c: undefined})
 * // => {a: 3, b: 4}
 * 
 * wt.shrink({a: 3, b: 4, c: undefined}, 4)
 * // => {a: 3, c: undefined}
 */
exports.shrink = (obj, value = undefined, deep = false) => {
    if (typeof obj !== 'object') return obj
    const result = {}
    Object.keys(obj).forEach(key => {
        if (obj[key] === value) return
        result[key] = obj[key]
    })
    return result
}

/**
 * 将 obj 对象里面的 props 属性挑选出来，组成一个数组
 * @param {Object} obj - 被挑选的对象
 * @param {Array} props - 属性数组
 * 
 * @example
 * 
 * wt.pick({a: 3, b: 'green', c: 4}, ['a', 'c'])
 * // => {a: 3, c: 4}
 */
exports.pick = (obj, props) => {
    const result = {}
    if (!Array.isArray(props)) return obj
    props.forEach(key => { result[key] = obj[key] })
    return result
}

window.webTools = exports