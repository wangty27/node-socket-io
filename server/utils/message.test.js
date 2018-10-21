var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct message object', (done) => {
        let newMessage = { from: 'test', url: 'https://www.google.com/maps?q=23,-10'};
        let latitude = 23;
        let longitude = -10;
        let result = generateLocationMessage(newMessage.from, latitude, longitude);
        expect(result.from).toBe(newMessage.from);
        expect(result.url).toBe(newMessage.url);
        expect(typeof(result.createdAt)).toBe('number');
        done();
    });
});