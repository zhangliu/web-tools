exports.paramsify = obj => {
    if (typeof obj !== 'object') return ''

    return Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object') return `${key}=${JSON.stringify(obj[key])}`
        return `${key}=${obj[key]}`
    }).join('&')
}