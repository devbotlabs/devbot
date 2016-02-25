// Modules
import {describe, it, before, after} from 'mocha';
import {expect} from 'chai';

// Mocks
import * as mockery from '../mocks/mockery.js';

// Target
import slackBotStamp from '../../src/workers/slack-bot.js';

// Tests
describe('slackBotStamp', () => {

    const output = [];
    let slackbots = null;

    before(() => {
        mockery.setup({
            output: output
        });

        slackbots = require('slackbots');
    });

    it('Should initialize the bot', () => {
        const bot = slackBotStamp();
        expect(bot.started).to.equal(true);
    });

    it('Should publish a simple message to a channel', (done) => {
        const bot = slackBotStamp();

        const message = 'hi';
        const channel = 'general';

        bot.postToSlack({
            channel: channel,
            message: message
        }).then(() => {

            const lastMessage = output[output.length - 1];

            try {
                expect(lastMessage).to.be.a('object');
                expect(lastMessage).to.eql({
                    message: message,
                    channel: channel
                });
            }
            catch (e) {
                done(e);
                return;
            }

            done();
        });
    });

    it('Should not post an empty message to a channel', (done) => {
        const bot = slackBotStamp();

        const message = '';
        const channel = 'general';

        const outputLength = output.length;

        bot.postToSlack({
            channel: channel,
            message: message
        }).then(() => {

            try {
                expect(outputLength).to.equal(output.length);
            }
            catch (e) {
                done(e);
                return;
            }

            done();
        });
    });

    it('Should post a simplemessage to a group', (done) => {
        const bot = slackBotStamp();

        const message = 'hi';
        const group = 'general';

        bot.postToSlack({
            group: group,
            message: message
        }).then(() => {

            const lastMessage = output[output.length - 1];

            try {
                expect(lastMessage).to.be.a('object');
                expect(lastMessage).to.eql({
                    message: message,
                    group: group
                });
            }
            catch (e) {
                done(e);
                return;
            }

            done();
        });
    });

    it('Should not post an empty message to a group', (done) => {
        const bot = slackBotStamp();

        const message = '';
        const group = 'general';

        const outputLength = output.length;

        bot.postToSlack({
            group: group,
            message: message
        }).then(() => {

            try {
                expect(outputLength).to.equal(output.length);
            }
            catch (e) {
                done(e);
                return;
            }

            done();
        });
    });

    it('Should throw an error when no channel or group are specified, but with a message', () => {
        const bot = slackBotStamp();

        const message = 'hey there';

        const outputLength = output.length;

        const fn = () => {
            bot.postToSlack({
                message: message
            })
        };

        expect(fn).to.throw(Error);
    });

    it('Should be able to subscribe to messages and listen to new messages', (done) => {
        const bot = slackBotStamp();

        bot.onMessage((data) => {

            done();
        });

        bot.bot.mockMessage({
            type: 'message',
            text: 'BLA'
        });
    });

    after(() => {
        mockery.tearDown();
    });

});
