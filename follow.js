//A twitter bot for following the users with the recent tweet on vue.js 

const twitter = require('twitter');
const config = require('./config');
var T = new twitter(config);

//Query
const params = {
    q: '#vue',
    count: 5,
    result_type: 'recent',
    lang: 'en'
}

//Searching accn to the query and getting the tweets in the response
T.get('search/tweets', params, (err, data, response) => {
    if (!err) {
        for (var i = 0; i < data.statuses.length; i++) {
            let screen_name = data.statuses[i].user.screen_name;
            T.post('friendships/create', { screen_name }, function (err, response) {  // sends the ids ,so that the tweets can be liked
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(`Followed ${screen_name}`);
                }
            })
        }
    }
    else {
        console.log(err);
    }
})