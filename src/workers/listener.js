import stampit from 'stampit';
import escapeStringRegexp from 'escape-string-regexp';

const listener = stampit({
    refs: {
        bot: null
    },
    methods: {
        listen() {
            this.bot.onMessage(message => {
                const text = message.text.trim();
                if (text.length && text.toLocaleLowerCase().indexOf(process.env.SLACK_BOT_NAME.toLocaleLowerCase()) === 0) {
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
                            moduleInstance = require('../modules/' + moduleName).default;
                        }
                        catch (e) {
                            this.bot.replyToSlack(message, moduleName + ' does not exist...');
                            return false;
                        }

                        // Printing info for the module
                        if ((matches.length === 2 && !moduleInstance.commands.default) ||
                            (matches.length > 2 && matches[2].trim() === 'help')
                        ) {
                            this.bot.replyToSlack(message, '*' + moduleName + '*: `' + moduleInstance.help + '`');
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
                                args = matches[3].trim();
                            }

                            moduleInstance.commands[command](this.bot, message, args);
                        }
                    }
                }
            });
        }
    }
});

export default listener;
