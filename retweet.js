//Response on a follow

const twitter = require('twitter');
const config = require('./config');

const T = new twitter(config);

const stream = T.stream('user');

stream.on('follow', followed);

function followed(event) {
    console.log('Event is running');
    let name = event.source.name, screenName = event.source.screen_name;
    tweetNow(`tHNKS for the followup @{screenName}`);
}

function tweetNow(text) {
    var tweet = {
        status: text
    };
    T.post('/statuses/update', tweet, function (err, res, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Done');
        }
    })
}