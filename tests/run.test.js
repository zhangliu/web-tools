const {run} = require('../src')
const {runTimes} = run

describe('run', () => {
    it('runTimes', async () => {
        await runTimes(() => console.log('hello world!'), 3, 1000)
    })
})