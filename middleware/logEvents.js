const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, filePath) => {

    const dateTime = `${format(new Date(), 'yyyy/MM/dd - HH:mm:ss')}`;
    const itemLog = `${dateTime}\t${uuid()}\t${message}\n`;
    // console.log(itemLog);

    try {

        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', filePath), itemLog);

    } catch (err) {
        console.error(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method}\t${req.path}`);
    next();

};

module.exports = {logger, logEvents};