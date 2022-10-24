const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: {type: String, required: true},
    password: {type: String, required: true},
    followers: {type: Array, required: false, default: [{type: String}]},
    following: {type: Array, required: false, default: [{type: String}]},
    posts: {type: Array, required: false, default: [{type: String}]},
    likes: {type: Array, required: false, default: [{type: String}]},    
});

module.exports = mongoose.model('UsersModel', UserSchema);