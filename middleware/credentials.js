const allowedOrigines = require('../config/allowedOrigines');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigines.includes(origin)) {
        res.header("Access-Control-Allow-credentials", true);
    }
    next();
}

module.exports = credentials;