const definition = {
    help: 'Just behaves like a parrot',
    commands: {

        repeat(bot, message, args) {
            bot.replyToSlack(message, args);
        },

        saywhat(bot, message) {
            bot.replyToSlack(message, 'Say what?')
        },

        default: 'saywhat'
    }
};

export default definition;
