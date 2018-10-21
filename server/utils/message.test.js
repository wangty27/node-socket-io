var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        let newMessage = { from: 'test', text: 'test text' };
        let result = generateMessage(newMessage.from, newMessage.text);
        expect(result.from).toBe(newMessage.from);
        expect(result.text).toBe(newMessage.text);
        expect(typeof(result.createdAt)).toBe('number');
        done();
    });
});