export default function(output, input) {

    const callbacks = new Map();

    return function() {
        this.postMessageToChannel = (channel, message) => {
            output.push({
                message: message,
                channel: channel
            });
        };

        this.postMessageToGroup = (group, message) => {
            output.push({
                message: message,
                group: group
            });
        };

        this.on = (event, callback) => {

            switch (event) {
                case 'start':
                    callback();
                    break;
                default:
                    callbacks.set(event, callback);
                    break;
            }
        };

        this.mockMessage = (messageData) => {
            input.push(messageData);

            const msgCallback = callbacks.get('message');

            if(msgCallback) {
                msgCallback(messageData);
            }
        }
    };
};
