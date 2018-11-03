/**
 * 执行 func 函数，如果成功就返回，否则将会重试 times 次
 * @param {function} func - 需要执行的函数
 * @param {number} times - 重试的次数
 * 
 * // 尝试抓取百度的首页内容，如果失败就重试 3 次
 * wt.run.runTimes( fetch('www.baidu.com'), 3)
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
 * @param {number} timeout - 等待的超时时间
 */
const waitRun = async (func, timeout) => {
    return Promise.race([
        func(),
        new Promise((r, j) => setTimeout(j(new Error('执行超时！')), timeout))
    ])
}

module.exports = {
    runTimes,
    runTimeout
}