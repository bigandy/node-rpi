const dateTime = require('./helpers/dateTime');



const Twitter = require('twitter');

const config = require('./config.json');

var client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret,
});


var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
    io: new Raspi()
});

board.on("ready", function() {
  var button = new five.Button("P1-7");
  var led = new five.Led("P1-11");
    // "down" the button is pressed
    button.on("down", function() {
        console.log("down");

        led.on();
        // led.fadeOut(500);
        
        const tweetButton = false;
        
        if (true === tweetButton) { client.post('statuses/update', {status: `Raspberry Pi3 posted this using #johnnyfive and #nodejs on ${dateTime}`})
            .then(function (tweet) {
                console.log(tweet.text);
            })
            .catch(function (error) {
                throw error;
            });
        }
        
      
    });
  
    // "hold" the button is pressed for specified time.
    // //        defaults to 500ms (1/2 second)
    // //        set
    button.on("hold", function() {
      console.log("hold");
    });
  
    // "up" the button is released
    button.on("up", function() {
      console.log("up");
      led.off();
    });
});
