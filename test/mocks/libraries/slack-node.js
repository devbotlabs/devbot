export default function () {
    return function () {
        this.api = (url, callback) => {

            let response = null;

            switch (url) {
                case 'channels.list':
                {
                    response = {
                        channels: [{
                            id: 'channel-id',
                            name: 'channel-name'
                        }]
                    }
                }
                    break;

                case 'groups.list':
                {
                    response = {
                        groups: [{
                            id: 'group-id',
                            name: 'group-name'
                        }]
                    }
                }
            }

            callback(null, response);
        }
    }
};
