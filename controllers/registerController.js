const User = require('../model/User');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 'message': 'UserName And Pass are Require.' });
    };

    const dublicate = await User.findOne({ username: username }).exec();

    if (dublicate) {
        return res.sendStatus(409); //Conflict.
    }

    try {
        const hashPass = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            'username': username,
            'password': hashPass
        });

        console.log("CREATED USER : ", createdUser);
        res.status(201).json({ 'success': `User Created ${username}` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };

