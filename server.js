const io = require("socket.io")();
var sensor = require('node-dht-sensor');




io.on("connection", client => {
    const interval = 1000;

    console.log("client is subscribing to timer with interval ", interval);

    var count = 0;
    sensor.read(22, 4, function(err, temperature, humidity) {
        if (!err) {
            console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
                'humidity: ' + humidity.toFixed(1) + '%'
            );
        }
    });
    let data = {
        temp: {
            high: 0,
            low: 100
        },
        humidity: {
            high: 0,
            low: 100
        }
    };
    setInterval(() => {
        sensor.read(22, 4, function(err, temperature, humidity) {
            if (!err) {
                console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
                    'humidity: ' + humidity.toFixed(1) + '%'
                );

                console.log(data.temp);

                if (temperature > data.temp.high) {
                    data.temp.high = temperature.toFixed(2);
                    // console.log('new high temperature', temperature);
                }
                if (temperature < data.temp.low) {
                    data.temp.low = temperature.toFixed(2);
                    // console.log('new low temperature', temperature);
                }

                if (humidity > data.humidity.high) {
                    data.humidity.high = humidity.toFixed(2);
                    // console.log('new high humidity', humidity);
                }
                if (humidity < data.humidity.low) {
                    data.humidity.low = humidity.toFixed(2);
                    // console.log('new low temperature', temperature);
                }

                client.emit('data', {humidity, temperature, data});
            }
        });

        client.emit("timer", count);

        count++;
    }, interval);
});

const port = 8000;
io.listen(port);
console.log(`listening on port ${port}`);