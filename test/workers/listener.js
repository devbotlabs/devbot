// Modules
import {describe, it, before, after} from 'mocha';
import {expect} from 'chai';

// Mocks
import * as mockery from '../mocks/mockery';

// Target
import listener from '../../src/workers/listener';
import slackBot from '../../src/workers/slack-bot';

// Tests
describe('listenerTest', () => {

    const output = [];
    const input = [];

    before(() => {
        mockery.setup({
            output: output,
            input: input
        });
    });

    it('Should not be firing the trigger if the message is empty', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: '12345',
            type: 'message',
            text: 'Test message'
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength);
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);

    });

    it('Should be able to intercept messages containing only the bot name', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: 'channel-id',
            type: 'message',
            text: process.env.SLACK_BOT_NAME
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength + 1);
                expect(output[output.length - 1]).to.eql({
                    message: 'What?',
                    channel: 'channel-name'
                });
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);
    });

    it('Should reply with an error message if the module does not exists', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: 'channel-id',
            type: 'message',
            text: process.env.SLACK_BOT_NAME + ' 404module'
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength + 1);
                expect(output[output.length - 1]).to.eql({
                    message: '404module does not exist...',
                    channel: 'channel-name'
                });
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);
    });

    it('Should reply with an error message if the module does not exists', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: 'channel-id',
            type: 'message',
            text: process.env.SLACK_BOT_NAME + ' 404module'
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength + 1);
                expect(output[output.length - 1]).to.eql({
                    message: '404module does not exist...',
                    channel: 'channel-name'
                });
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);
    });

    it('Should trim the message', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: 'channel-id',
            type: 'message',
            text: '    ' + process.env.SLACK_BOT_NAME + ' parrot   '
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength + 1);
                expect(output[output.length - 1].message).to.contain('Parrot here');
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);
    });

    it('Should trigger the default command if nothing else except module name is specified', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: 'channel-id',
            type: 'message',
            text: process.env.SLACK_BOT_NAME + ' parrot'
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength + 1);
                expect(output[output.length - 1].message).to.contain('Parrot here');
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);
    });

    it('Should trigger help if requested with the help command', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: 'channel-id',
            type: 'message',
            text: process.env.SLACK_BOT_NAME + ' parrot help'
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength + 1);
                expect(output[output.length - 1].message).to.contain('This is parrot test help');
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);
    });

    it('Should say if the command does not exist for the module', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: 'channel-id',
            type: 'message',
            text: process.env.SLACK_BOT_NAME + ' parrot 404command'
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength + 1);
                expect(output[output.length - 1]).to.eql({
                    message: '404command is not recognized as a valid command for parrot',
                    channel: 'channel-name'
                });
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);
    });

    it('Should forward arguments with the command', (done) => {
        const myListener = listener({bot: slackBot()});
        const originalLength = output.length;

        myListener.listen();
        myListener.bot.bot.mockMessage({
            channel: 'channel-id',
            type: 'message',
            text: process.env.SLACK_BOT_NAME + ' parrot repeat dummy'
        });

        setTimeout(() => {
            try {
                expect(output.length).to.equal(originalLength + 1);
                expect(output[output.length - 1]).to.eql({
                    message: 'dummy',
                    channel: 'channel-name'
                });
            }
            catch(e) {
                done(e);
                return;
            }

            done();
        }, 1);
    });

    after(() => {
        mockery.tearDown();
    });

});
