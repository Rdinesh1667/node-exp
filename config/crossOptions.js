const allowedOrigines = require('./allowedOrigines');

const options = {
    origin: (origin, callback) => {
        if (allowedOrigines.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('NOT ALLOWED BY CROSS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = options;