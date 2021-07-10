import { check } from '../src/client/js/checkUrl';

describe('The function "check(url)" should exist', () => {
    test('It should return true', async() => {
        expect(check).toBeDefined()
    })
})
describe('The function "check(url)" should be a function', () => {
    test('It should be a function', async() => {
        expect(typeof check).toBe('function')
    })
})

describe('Tthe function "check(url)" for valid url', () => {
    var url = 'https://www.google.com'
    test('It should return true', async() => {
        const res = check(url)
        expect(res).toBeDefined()
        expect(res).toBe(true)
    })
})
describe('Test "check(url)" for invalid url', () => {
    // I replaced 'https' with 'htpshttps' to make it invalid
    var url = 'htpshttps:////www.google.com'
    test('It should return false', async() => {
        const res = check(url)
        expect(res).toBeDefined()
        expect(res).toBe(false)
    })
})