const definition = {
    help: 'Just behaves like a parrot',
    commands: {
        repeat(bot, message, args) {
            bot.replyToSlack(message, args);
        }
    }
};

export default definition;
