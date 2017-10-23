const config = require('./config.json');

const Sonos = require('sonos').Sonos;

// var sonos = new Sonos(config.sonos.bedroom); 


for (variable in config.sonos) {
    // console.log(config.sonos[variable]); 

    // console.log(variable);

    let room = variable;
    var sonos = new Sonos(config.sonos[room]); 
    
    // console.log(sonos);

    sonos.getFavoritesRadioStations({}, function (err, data) {
        
        // console.log('this is the variable ', room);
        // console.log(variable, data.items)
        data.items.forEach(item => {
            // console.log(item, room);
            var stationId = item.uri.replace(/x-sonosapi-stream:s/i, '').substring(0, 5);
            console.log([stationId, item.title]);
            if (item.title === 'FIP') {
                var stationId = item.uri.replace(/x-sonosapi-stream:s/i, '').substring(0, 5);
                console.log(stationId);
                
                // sonos.playTuneinRadio(stationId, 'FIP', (err, result) => {
                //     if (err) {
                //         return console.log('error', err)
                //     }
                //     if (result) {
                //         console.log('result', result);
                //     }
                // })
            }
        });
    });
}

function playRoom(sonos, stationId) {
    
}

// const rooms = ['bedroom', 'kitchen', 'lounge'];

// sonos.getCurrentState((err, status) => {
//     if (status !== 'playing') { 
//         sonos.play((err, playing) => console.log(err, playing));
//     } else {
//         sonos.pause((err, playing) => console.log(err, playing));
//     } 
// });


// var sonos = new Sonos(config.sonos.bedroom); 
// console.log(config.sonos);
// var sonos = config.sonos;
// [...sonos].forEach(item => console.log(item));


// var stationId = '32717'
// var stationTitle = 'KFRR'

// sonos.playTuneinRadio(stationId, stationTitle, (err, result) => {
//   if (err) {
//     return console.log(err)
//   }
// })