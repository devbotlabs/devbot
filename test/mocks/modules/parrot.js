const definition = {
    help: 'This is parrot test help',
    commands: {

        repeat(bot, message, args) {
            bot.replyToSlack(message, args);
        },

        saywhat(bot, message) {
            bot.replyToSlack(message, 'Parrot here')
        },

        default: 'saywhat'
    }
};

export default definition;
