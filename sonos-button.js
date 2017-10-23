const config = require('./config.json');

const Sonos = require('sonos').Sonos;

var sonos = new Sonos(config.sonos.bedroom); 

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

        sonos.getCurrentState((err, status) => {
            if (status !== 'playing') { 
                sonos.play((err, playing) => console.log(err, playing));
            } else {
                sonos.pause((err, playing) => console.log(err, playing));
            } 
        });
        
        
        
      
    });
  
    // "up" the button is released
    button.on("up", function() {
        console.log("up");
        led.off();

        // sonos.getCurrentState((err, status) => {
        //     if (status !== 'playing') { 
        //         sonos.play((err, playing) => console.log(err, playing));
        //     } else {
        //         sonos.pause((err, playing) => console.log(err, playing));
        //     } 
        // });
    });
});
