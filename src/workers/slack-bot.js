import stampit from 'stampit';
import slackMessage from '../entities/slack-message.js';

const slackBot = stampit({
        refs: {
            setupPromise: null,
            started: false,
            bot: null,
            api: null,
            cachedChannels: new Map()
        },
        methods: {
            getChannelName(channelId) {

                const findChannelOrGroup = (resolve) => {
                    this.api('channels.list', (error, response) => {
                        const channel = response.channels.find(channel => channel.id === channelId);

                        if (channel) {
                            resolve({channel: channel.name});
                        } else {
                            this.api('groups.list', (error, response) => {
                                const group = response.groups.find(group => group.id === channelId);

                                if (group) {
                                    resolve({group: group.name});
                                } else {
                                    resolve();
                                }
                            });
                        }
                    });
                };

                return new Promise(resolve => {
                    const cachedChannel = this.cachedChannels.get(channelId);

                    if(cachedChannel) {
                        resolve(cachedChannel);
                        return;
                    }

                    findChannelOrGroup((response) => {
                        this.cachedChannels.set(channelId, response);
                        resolve(response);
                    });
                });
            },

            postToSlack({message, channel, channelId, group}) {

                // Empty message
                if (!(message || '').toString().trim().length) {
                    return this.setupPromise;
                }

                // Reposting with the channel id
                if (channelId) {
                    return new Promise(resolve => {
                        this.getChannelName(channelId).then(response => {

                            if (response) {
                                const properties = {
                                    message: message,
                                    group: response.group,
                                    channel: response.channel
                                };

                                this.postToSlack(properties).then(() => {
                                    resolve();
                                });
                            } else {
                                resolve();
                            }
                        });
                    });
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

            replyToSlack(message, reply) {

                // Empty reply
                if (!(reply || '').toString().trim().length) {
                    return this.setupPromise;
                }

                if (!message.channel) {
                    throw new Error('No channel');
                }

                this.postToSlack({
                    message: reply,
                    channelId: message.channel
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
            const SlackNode = require('slack-node');

            this.api = (new SlackNode(process.env.SLACK_BOT_TOKEN)).api;

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

export default slackBot;
