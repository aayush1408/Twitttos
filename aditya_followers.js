//A twitter bot that allows me to follow a single person and all of his followers 

const twitter = require('twitter');
const config = require('./config');

const T = new twitter(config);

const params = {
    q: '@dev__adi'
}
T.get('users/search', params, (err, data, response) => {
    if (err) {
        console.log(err);
    }
    else {
        let id = data[0].id_str;
        T.post('friendships/create', { id }, (err, res) => {
            if (!err) {
                console.log('Followed Adi');
            }
        });
        T.get('followers/ids', { id }, (err, data, response) => {
            if (!err) {
                for (let i = 0; i < data.ids.length; i++) {
                    let iD = { id: data.ids[i] };
                    T.post('friendships/create', iD, (err, response) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(`Done ${response} ${iD}`);
                        }
                    })
                }
            }
            else {
                console.log(err);
            }
        })
    }
})