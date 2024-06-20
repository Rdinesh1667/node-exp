const { logEvents } = require('./logEvents')


function errorHandler(err,req, res, next) {
    logEvents(`${err.name}\t${err.message}`, 'errLogs.txt');
    console.log("CROSS ERROE FROM REQUSEST: ", err.stack);
    res.status(500).send(err.message);
};


module.exports = { errorHandler }