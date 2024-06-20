const User = require('../model/User');

const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookie.jwt;
    const currentUser = await User.findOne({ refreshToken }).exec();
    if (!currentUser) return res.sendStatus(403); // Forbidden;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err || currentUser.username !== decoded.username) return res.sendStatus(403); //Forbidden;
            const roles = Object.values(currentUser.roles);
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        'username': decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN,
                { expiresIn: '300s' }
            );
            res.json({ accessToken });
        }
    );


}

module.exports = { handleRefreshToken };

