/**
 * 睡眠函数
 * @param {number} timeout - 睡眠的时间，单位：ms
 * 
 * @example
 * 
 * // 等待 3 秒钟
 * await wt.run.sleep(3000)
 * 
 */
exports.sleep = timeout => new Promise((resolve, reject) => setTimeout(resolve, timeout))