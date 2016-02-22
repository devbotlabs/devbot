export default function() {
    return {
        name: 'gitme',
        actions: [
            {
                trigger: 'how many pull requests',
                action: (bot, message) => {
                    bot.postMessage('channelId', 'Hello World!');
                }
            },
            {
                trigger: 'delete pull request {{pullRequestId}}',
                action: (bot, deleteMessage, params) => {
                    bot.postMessage('channelId', `Do you want to delete pull request ${params.pullRequestId}?`);

                    return {
                        responses: [
                            {
                                trigger: 'yes',
                                action: (bot, confirmMessage) => {
                                    bot.postMessage('channelId', `Woa buddy, are you really sure?`);

                                    return {
                                        responses: [
                                            {
                                                trigger: 'fuck yeah',
                                                action: (bot, confirmMessage) => {
                                                    // delete pull request
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]
    };
}