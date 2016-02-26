// Modules
import {describe, it, before, after} from 'mocha';
import {expect} from 'chai';

// Mocks
import * as mockery from '../mocks/mockery.js';
import slackbot from '../mocks/workers/slack-bot.js';

// Target
import listener from '../../src/workers/listener.js';

// Tests
describe('listenerTest', () => {

    before(() => {
        mockery.setup();
    });

    it('Should initialize the listener', () => {
        const myListener = listener({bot: slackbot});
        myListener.listen();
        expect(myListener.listening).to.equal(true);
    });

    it('Should not be listening if not requested', () => {
        const myListener = listener({bot: slackbot});
        expect(myListener.listening).to.equal(false);
    });



});
