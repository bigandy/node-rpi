var five = require("johnny-five");
var Rasp = require("raspi-io");

const pin = 16;


var board = new five.Board({
    io: new Rasp()
});

board.on("ready", function() {
    // this.pinMode(16, fivePin.INPUT);

    this.digitalRead('P1-16', function(value){
        console.log(value);
    });
});