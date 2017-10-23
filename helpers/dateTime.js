const addZero = require('./addZero');

const currentDate = new Date(),
    date = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear(),
    hours = addZero(currentDate.getHours()),
    minutes = addZero(currentDate.getMinutes()),
    seconds = addZero(currentDate.getSeconds());

const dateTime = `${date}/${month}/${year} @ ${hours}:${minutes}:${seconds}`;

module.exports = dateTime;