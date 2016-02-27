import slackbots from './libraries/slackbots'
import slackNode from './libraries/slack-node'
import dotenv from 'dotenv';
const parrot = require('./modules/parrot');

const mockery = require('mockery');

const setup = ({output, input} = {output: [], input: []}) => {

    // Mocking libraries
    mockery.registerMock('slackbots', slackbots(output, input));
    mockery.registerMock('slack-node', slackNode());
    mockery.registerMock('../modules/parrot', parrot);

    // Enabling mockery
    mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    dotenv.config({
        path: __dirname + '/../.test.env'
    });

    dotenv.load();
};
const tearDown = () => {
    mockery.disable();
};

export {setup, tearDown};
