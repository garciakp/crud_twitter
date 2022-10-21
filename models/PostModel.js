const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: {type: String, required: true},
    post: {type: String, required: true},
    likes: {type: Array, required: false, default: []},
    date: {type: Date, required: true, default: Date.now},
});

module.exports = mongoose.model('PostModel', PostSchema);
