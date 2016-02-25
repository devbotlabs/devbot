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

postMessage = ({ message, channel }) => {

};

export default {setup, postMessage}
