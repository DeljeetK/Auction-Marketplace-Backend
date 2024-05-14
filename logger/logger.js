// logger to create a log and store in a file.
const logger = require("logger").createLogger(`${__dirname}/logs.log`)

// Logger which will create log for each event and create a new log file every new day.
// const winston = require('winston');
// const { format } = require('winston');
// const DailyRotateFile = require('winston-daily-rotate-file');
// const moment = require('moment');

// const transport = new DailyRotateFile({
//   filename: `${__dirname}/logs-%DATE%.log`,
//   datePattern: 'YYYY-MM-DD',
//   zippedArchive: true,
//   maxSize: '20m',
//   maxFiles: '14d'
// });

// const logger = winston.createLogger({
//   format: format.combine(
//     format.timestamp(),
//     format.json()
//   ),
//   transports: [
//     new winston.transports.Console(),
//     transport
//   ]
// });

module.exports = logger;
