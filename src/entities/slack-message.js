const stampit = require('stampit');

const slackMessage = stampit({
    refs: {
        text: null,
        channel: null,
        team: null,
        user: null,
        ts: null
    }
});

export default slackMessage;
