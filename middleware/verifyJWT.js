
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); //UnAuthorise
    const authToken = authHeader.split(' ')[1];
    console.log('\nAUTH TOKEN :', authToken); //bearer token
    jwt.verify(authToken,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err)  {
                console.error(err.message);
                return res.sendStatus(403); // invalid token, Forbidden;
            }
            console.log('\nDECODED USER : ', decoded.userInfo.username,'\n');
            req.username = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT;