//A bot that selects the latest 10 tweets on node.js and add thems to favourite.

const twitter = require('twitter');
const config = require('./config');
var T = new twitter(config);

//Query
const params = {
    q: '#vue',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

//Searching accn to the query and getting the tweets in the response
T.get('search/tweets', params, (err, data, response) => {
    if (!err) {
        for (var i = 0; i < data.statuses.length; i++) {
            let id = { id: data.statuses[i].id_str }
            T.post('favorites/create', id, function (err, response) {  // sends the ids ,so that the tweets can be liked
                if (err) {
                    console.log(err);
                }
                else {
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log(`https://twitter.com/${username}/status/${tweetId}`);
                }
            })
        }
    }
    else {
        console.log(err);
    }
})