var RaspiCam = require("raspicam");

const timeLimit = 60 * 1000 * 60 * 12; // 12 hours

var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
    io: new Raspi()
});

var camera = new RaspiCam({
	mode: "timelapse",
	output: "./timelapse/image_%06d.jpg", // image_000001.jpg, image_000002.jpg,...
	encoding: "jpg",
	timelapse: 1000 * 30, // take a picture every 30 seconds
	timeout: timeLimit // take a total of 10 * 60 = 600 pictures over 60 seconds
});

board.on("ready", function() {
    // var button = new five.Button("P1-7");
    var led = new five.Led("P1-11");

    camera.on("read", function( err, timestamp, filename ){
        console.log("timelapse image captured with filename: " + filename);
        
        console.log('error ', err);        
        console.log('filename ', filename);
        led.on();

        setTimeout(function(){
            led.off();
        }, 500);
    });

    camera.start();
    
    // test stop() method before the full 12 seconds is up
    setTimeout(function(){
        camera.stop();
    }, timeLimit);
});
