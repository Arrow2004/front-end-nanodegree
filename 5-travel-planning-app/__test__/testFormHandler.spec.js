// Import the js file to test
import { handleSubmit } from '../src/client/js/formHandler'

describe('The function "handleSubmit()" should exist', () => {
    test('It should return true', async() => {
        expect(handleSubmit).toBeDefined()
    })
})
describe('The function "handleSubmit()" should be a function', () => {
    test('It should be a function', async() => {
        expect(typeof handleSubmit).toBe('function')
    })
})