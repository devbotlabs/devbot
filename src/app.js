import slackBot from './workers/slack-bot.js';

const bot = slackBot();
bot.onMessage(data => {
    console.log(data);
});
