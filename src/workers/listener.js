import stampit from 'stampit';
import escapeStringRegexp from 'escape-string-regexp';

const listener = stampit({
    refs: {
        bot: null,
        listening: false
    },
    methods: {
        listen() {
            this.listening = true;

            this.bot.onMessage(message => {

                const text = (message.text || '').toString().toLowerCase();

                if (text.length) {

                    if (text.indexOf(process.env.SLACK_BOT_NAME) === 0) {

                        if (text.length === process.env.SLACK_BOT_NAME.length) {
                            this.bot.replyToSlack(message, 'What?');
                        } else {

                            const commandRegExp = new RegExp(process.env.SLACK_BOT_NAME +
                                ' ([:-a-z0-9]+)( [-a-z0-9]+)?( .*?)?$', 'i');
                            const matches = text.match(commandRegExp).filter(match => match);

                            // Loading Module
                            const moduleName = matches[1];
                            let moduleInstance = null;

                            try {
                                moduleInstance = require('../modules/' + moduleName + '.js').default;

                                if(!moduleInstance) {
                                    throw new Error('Module 404');
                                }
                            }
                            catch (e) {
                                console.log(e);
                                this.bot.replyToSlack(message, moduleName + ' does not exists.');
                                return false;
                            }

                            // Printing info for the module
                            if ((matches.length === 2 && !moduleInstance.commands.default) ||
                                (matches.length > 2 && matches[2].trim() === 'help')
                            ) {
                                this.bot.replyToSlack(message, '*' +moduleName + '*: `' + moduleInstance.help + '`');
                            } else { // Executing command
                                const command = matches.length === 2 ?
                                    moduleInstance.commands.default :
                                    matches[2].trim();

                                if (!moduleInstance.commands[command]) {
                                    this.bot.replyToSlack(message, command + ' is not recognized as a valid command for ' +
                                        moduleName);
                                    return false;
                                }

                                let args = [];

                                if (matches.length > 3) {
                                    args = matches[3];
                                }

                                moduleInstance.commands[command](this.bot, message, args);
                            }
                        }
                    }

                }

            });
        }
    }
});

export default listener;
