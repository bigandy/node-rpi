const Twitter = require('twitter');

const config = require('./config.json');

const dateTime = require('./helpers/dateTime');

var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret,
});

client.post('statuses/update', {status: `Posted by #nodejs on ${dateTime}`})
  .then(function (tweet) {
    console.log(tweet.text);
  })
  .catch(function (error) {
    throw error;
  });

