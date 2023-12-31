const { createLogger, format, transports } = require('winston');
const { combine, timestamp , printf  , json} = format;


const myFormat = printf(({ level, message, timestamp , meta }) => {
  if(meta){
     return `${timestamp} | [ ${level} ] | ${message} | ${meta}`;
  }
  return `${timestamp} | [ ${level} ] | ${message}`;
});

const date = new Date();
const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat,
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: `logs/${date.getFullYear()}_${date.getMonth()}_${date.getDate()}_error.log`, level:'error'}),
    new transports.File({ filename: `logs/${date.getFullYear()}_${date.getMonth()}_${date.getDate()}_info.log`, level:'info'})
]
});

module.exports = logger;