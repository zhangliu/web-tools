
exports.parse = (str, defaultValue) => {
    try {
        return JSON.parse(str)
    } catch (e) {
        return defaultValue
    }
}