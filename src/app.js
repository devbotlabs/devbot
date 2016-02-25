import slackBot from './bot-stamps/slack.js';

const a = slackBot();

a.postToSlack({
    group: 'devbot',
    message: 'Hey Bitches!'
});
