const User = require('../model/User');


const handleLogoutUser = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //No COntent;
    const refreshToken = cookies.jwt;
    const currentUser = await User.findOne({ refreshToken }).exec();;
    if (!currentUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.sendStatus(204); // No COntent;
    }

    // REMOVE the refresh token form current user;
    currentUser.refreshToken = '';
    const updatedUser = await currentUser.save();
    console.log('\nLOG OUT USER : ', updatedUser);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogoutUser }

