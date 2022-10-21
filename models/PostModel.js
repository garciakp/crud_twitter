const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: {type: String, required: true},
    post: {type: String, required: true},
    likes: {type: Array, required: false, default: []},
});

module.exports = mongoose.model('PostModel', PostSchema);