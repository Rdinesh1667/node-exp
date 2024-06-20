const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    roles: {
        user: {
            type: String,
            default: 'USER'
        },
        admin: String,
        editer: String
    },
    refreshToken: String,
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);