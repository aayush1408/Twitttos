//A bot to favorite random recent tweet related to anime

const twit = require('twit');
const config = require('./config2');

const T = twit(config);

const retweet = function () {
    const params = {
        q: '#anime',
        recent_type: 'recent',
        lang: 'en'
    };
    T.get('/search/tweets', params, function (err, data) {
        if (!err) {
            var tweets = data.statuses;
            var random = randomNo(tweets);
            var randomTweet = tweets[random];
            T.post('/favorites/create', { id: randomTweet.id_str }, function (err, response) {
                if (!err) {
                    console.log('Added to favourites');
                }
                else {
                    console.log('Error');
                }
            })
        }
        else {
            console.log(err);
        }
    });
}

function randomNo(arr) {
    var ran = Math.floor(Math.random() * arr.length);
    return ran;
}

retweet();
setInterval(retweet, '300000');
