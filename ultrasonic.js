var LedControl = require("rpi-led-control");
var usonic = require('mmm-usonic');

var sensor;

var echoPin = 23,
	triggerPin = 24;


// var display = new LedControl(11,10,9);
// display.setBrightness(0,15);

var startTime = Date.now();


usonic.init(function (error) {
	if (error) {
		console.log(error);
	} else {
	sensor = usonic.createSensor(echoPin, triggerPin, 750); // last parameter is timeout
	setInterval(loop, 50);
    }
});

function loop() {
	var distance = sensor();
    if(distance<0) distance = 100;

    console.log(distance);
	// display.showNumber(0,distance,1);
}