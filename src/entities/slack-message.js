const stampit = require('stampit');

const slackMessageStamp = stampit({
    refs: {
        text: null,
        channel: null,
        team: null,
        user: null,
        ts: null
    }
});

export default slackMessageStamp;
