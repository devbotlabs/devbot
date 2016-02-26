import slackbots from './libraries/slackbots.js'
import slackNode from './libraries/slack-node.js'
import dotenv from 'dotenv';
const parrot = require('./modules/parrot.js');

const mockery = require('mockery');

const setup = ({output, input} = {output: [], input: []}) => {

    // Mocking libraries
    mockery.registerMock('slackbots', slackbots(output, input));
    mockery.registerMock('slack-node', slackNode());
    mockery.registerMock('../modules/parrot.js', parrot);

    // Enabling mockery
    mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    dotenv.config({
        path: __dirname + '/../.env'
    });

    dotenv.load();
};
const tearDown = () => {
    mockery.disable();
};

export {setup, tearDown};
