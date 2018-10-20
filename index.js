exports.json = require('./json')
exports.time = require('./time')
exports.url = require('./url')

/**
 * 根据 propsPath 获取 obj 对象中相应的属性值
 * @param {Object} obj - 被搜索的对象
 * @param {string} propsPath - 属性路劲
 * @param {*} defaultValue - 如果没有找到对应的属性值，返回的默认值
 * @example
 * 
 * console.log(wt.get({a: {b: {c: {d: 3}}}}, 'a.b.c.d'), 5)
 * // => 3
 * 
 * console.log(wt.get({a: {b: {c: {d: 3}}}}, 'a.b.c.d.e.f'), 5)
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

exports.shrink = (obj, value = undefined, deep = false) => {
    if (typeof obj !== 'object') return obj
    const result = {}
    Object.keys(obj).forEach(key => {
        if (obj[key] === value) return
        result[key] = obj[key]
    })
    return result
}

exports.pull = (obj, props) => {
    const result = {}
    if (!Array.isArray(props)) return obj
    props.forEach(key => { result[key] = obj[key] })
    return result
}