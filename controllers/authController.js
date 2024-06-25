const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleAuthUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 'message': 'UserName And Pass are Require.' });
    };

    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return res.sendStatus(401) //Unauthorized.
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {

        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    'username': foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN,
            { expiresIn: '1d' }
        );
        //Update refresh token in DB;
        foundUser.refreshToken = refreshToken;
        const updatedUser = await foundUser.save();
        console.log('AUTH UPDATED TOKEN : ', updatedUser);

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //secure: true// sameSite: 'none', secure: true
        res.json({ roles, accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleAuthUser };

