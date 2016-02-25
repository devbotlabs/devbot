import stampit from 'stampit';
import slackMessage from '../entities/slack-message.js';

const slackStamp = stampit({
        refs: {
            setupPromise: null,
            started: false,
            bot: null
        },
        methods: {
            postToSlack({message, channel, params, group}) {

                // Empty message
                if (!(message || '').toString().trim().length) {
                    return this.setupPromise;
                }

                if (!channel && !group) {
                    throw new Error('Missing target');
                }

                // Posting
                return this.setupPromise.then(() => {

                    if (channel) {
                        this.bot.postMessageToChannel(channel, message);
                    }

                    if (group) {
                        this.bot.postMessageToGroup(group, message);
                    }
                });
            },

            onMessage(callback) {


                this.bot.on('message', (data) => {

                    if (data.type === 'message') {

                        const msgObj = {
                            text: data.text,
                            channel: data.channel,
                            team: data.team,
                            user: data.user,
                            ts: data.ts
                        };

                        const message = slackMessage(msgObj);
                        callback(message);
                    }
                });
            }
        },
        init()
        {

            const SlackBot = require('slackbots');

            this.bot = new SlackBot({
                token: process.env.SLACK_BOT_TOKEN,
                name: process.env.SLACK_BOT_NAME
            });

            this.setupPromise = new Promise(resolve => {
                this.bot.on('start', () => {
                    this.started = true
                    resolve();
                });
            });
        }
    })
    ;

export default slackStamp;
