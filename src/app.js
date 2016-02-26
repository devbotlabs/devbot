import slackBot from './workers/slack-bot.js';
import listener from './workers/listener.js';

const bot = slackBot();

listener({
    bot: bot
}).listen();
