const five = require('johnny-five');
const Raspi = require('raspi-io');
const board = new five.Board({
	io: new Raspi()
});
const Sonos = require('sonos').Sonos;

const config = require('./config.json');



board.on('ready', function() {
	var button = {
		one: new five.Button('P1-7'),
		two: new five.Button('P1-15'),
		three: new five.Button('P1-40'),
		big: new five.Button('P1-33'),
	};

	var led = {
		one: new five.Led('P1-37'),
		two: new five.Led('P1-38'),
		three: new five.Led('P1-35'),
	}

	var state = {
		one: false,
		two: false,
		three: false,
	};

	const setState = (state) => {
		for (let key of Object.keys(state)) {
			if (state[key] === true) {
				led[key].on();
			} else {
				led[key].off();
			}
		}
	};

	const toggleState = (state) => {
		for (let key of Object.keys(state)) {
			if (state[key] === true) {
				led[key].toggle();
			// } else {
			// 	led[key].off();
			}
		}
	};

	// Big Button 'down' the button is pressed
	button.one.on('down', function() {
		state = {
			one: true,
			two: false,
			three: false,
		};

		setState(state);
	});

	button.two.on('down', function() {
		state = {
			one: false,
			two: true,
			three: false,
		};

		setState(state);
	});

	button.three.on('down', function() {
		state = {
			one: false,
			two: false,
			three: true,
		};

		setState(state);
	});

	button.big.on('down', function() {
		console.log('big down');

		// console.log(state);

		toggleState(state);


		playRandomFavorite();

	});
});




// var sonos = new Sonos(config.sonos.bedroom);




    // console.log(sonos);
	// sonos.play((err, playing) => console.log(err, playing));

	// sonos.play().then(result => {
	// 	console.log('Started playing %j', result)
	// }).catch(err => { console.log('Error occurred %j', err) })

	// sonos.getVolume().then(volume => {
	// 	console.log('The volume is %d', volume)
	// }).catch(err => { console.log('Error occurred %j', err) })

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


// sonos.setVolume(10).then(volume => {
// 	sonos.getVolume().then(vol => console.log('the volume is ', vol));
// }).catch(err => { console.log('Error occurred %j', err) })

const playRandomFavorite = (room = 'bedroom') => {
	var sonos = new Sonos(config.sonos[room]);

	sonos.getFavorites().then(favorites => {
		favorites = favorites.items.filter((item) => item.uri.includes('x-sonosapi-stream'));

		const numberOfFavorites = favorites.length;
		const randomNumber = getRandomInt(0, numberOfFavorites - 1);

		console.log(favorites[randomNumber], randomNumber, numberOfFavorites);

		var stationId = favorites[randomNumber].uri.replace(/x-sonosapi-stream:s/i, '').substring(0, 5).replace('?', '');
		var title = favorites[randomNumber].title;

		console.log(title, stationId);

		sonos.playTuneinRadio(stationId, title)
			.then((result) => {
				console.log('result', result);
			})
			.catch(e => console.log('an error occurred'));

	}).catch(err => { console.log('Error occurred %j', err) });
};

playRandomFavorite();