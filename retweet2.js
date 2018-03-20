//Retweet the recent tweet on nodejs in every 50 seconds

const twit = require('twit');
const config = require('./config2');

const T = new twit(config);

const reTweet = function () {
    const params = {
        q: '#nodejs',
        result_type: 'recent'
    }
    T.get('/search/tweets', params, function (err, data) {
        if (!err) {
            var retweetId = data.statuses[0].id_str;
            T.post('/statuses/retweet/:id', {
                id: retweetId
            }, function (err, response) {
                if (!err) {
                    console.log('Tweeted');
                }
                else {
                    console.log('Some error occured');
                }
            });
        }
        else {
            console.log(err);
        }
    });
}
reTweet();
setInterval(reTweet, '30000');