export default function(output) {

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
            }
        };
    };
};
