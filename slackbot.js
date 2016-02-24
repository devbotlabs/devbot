import config from 'config';

var SlackBot = require('slackbots');

var bot = null;
var botReadyPromise = new Promise();

setup = () => {
    bot = new SlackBot({
        token: config.slack.token,
        name: config.slack.name
    });

    bot.on('start', () => {

        botReadyPromise.resolve();
    });
};

export {setup}
