import slackbots from './libraries/slackbots.js'
import dotenv from 'dotenv';

const mockery = require('mockery');

const setup = ({output}) => {
    mockery.registerMock('slackbots', slackbots(output));
    mockery.enable({ useCleanCache: true });
    dotenv.config({
        path: '../'
    });
};
const tearDown = () => {
    mockery.disable();
};

export {setup, tearDown};
