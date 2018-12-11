const {sleep} = require('../time/index')

/**
 * 执行 func 函数，如果成功就返回，否则将会重试 times 次
 * @param {function} func - 需要执行的函数
 * @param {number} times - 重试的次数
 * 
 * @example
 * 
 * // 尝试抓取百度的首页内容，如果失败就重试 3 次
 * await wt.run.runTimes(fetch('www.baidu.com'), 3)
 */
const retryRun = async (func, times = 5) => {
    let count = times || 5
    while (count--) {
        try {
            return await func()
        } catch (err) {
            if (!count) throw err
        }
    }
}

/**
 * 等待 func 的在 timeout 时间内执行完成，如果未完成，就抛出超时异常
 * @param {function} func - 需要等待执行的函数
 * @param {number} timeout - 等待的超时时间，单位：ms
 * 
 * @example
 * // 尝试抓取百度的首页内容，如果 5 秒内没返回，就报错
 * await wt.run.waitRun(fetch('www.baidu.com'), 5000)
 */
const waitRun = async (func, timeout) => {
    return Promise.race([
        func(),
        new Promise((r, j) => setTimeout(j(new Error('执行超时！')), timeout))
    ])
}

/**
 * 多次执行某个函数，每次执行间隔 interval 毫秒
 * @param {function} func - 需要执行的函数
 * @param {number} times - 执行的次数
 * @param {number} interval - 每次执行间隔毫秒数
 */
const runTimes = async (func, times = 5, interval) => {
    for (let i = 0; i < times; i++) {
        await func()
        if (interval > 0) await sleep(interval)
    }
}

module.exports = {
    retryRun,
    waitRun,
    runTimes
}