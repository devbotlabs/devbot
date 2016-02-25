import slackbots from './libraries/slackbots.js'

const mockery = require('mockery');

const setup = ({output}) => {

    mockery.registerMock('slackbots', slackbots(output));
    mockery.enable({ useCleanCache: true });
};
const tearDown = () => {
    mockery.disable();
};

export {setup, tearDown};
