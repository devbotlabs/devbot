import slackBot from './workers/slack-bot';
import listener from './workers/listener';

const bot = slackBot();

listener({
    bot: bot
}).listen();
