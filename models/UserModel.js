const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: {type: String, required: true},
    password: {type: String, required: true},
    followers: {type: Array, required: false, default: []},
    following: {type: Array, required: false, default: []},
    posts: {type: Array, required: false, default: []},
});

module.exports = mongoose.model('UsersModel', UserSchema);