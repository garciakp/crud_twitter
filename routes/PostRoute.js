const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');

// Create post and add post to user
router.post('/', (req, res) => {
    const post = PostModel({
        user: req.body.user,
        post: req.body.post,
    });
    post
    .save()
    .then(data => {
        UserModel
        .updateOne({user: req.body.user}, {$addToSet: {"posts": data._id}})
        .then(data => {res.json(data);})
        .catch(err => {res.json({message: err});});
    })
    .catch(err => {res.json({message: err});});
});

// Read all posts from an user
router.get('/byuser/:user', (req, res) => {
    UserModel
    .findOne({user: req.params.user})
    .then(data => {
        PostModel
        .find({_id: {$in: data.posts}})
        .then(data => {res.json(data);})
        .catch(err => {res.json({message: err});});
    })
    .catch(err => {res.json({message: err});});
});

// Read all posts from an user by userID
router.get('/byuserid/:id', (req, res) => {
    UserModel
    .findById(req.params.id)
    .then(data => {
        PostModel
        .find({_id: {$in: data.posts}})
        .then(data => {res.json(data);})
        .catch(err => {res.json({message: err});});
    })
    .catch(err => {res.json({message: err});});
});

// Read all posts from everyone
router.get('/', (req, res) => {
    PostModel
    .find()
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

// Update post by postId
router.patch('/:id', (req, res) => {
    PostModel
    .updateOne({_id: req.params.id}, {$set: {"post": req.body.post}})
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

//Delete post by postId and delete post from user post array
// No lo está borrando del array de posts del usuario ------------------------------------ FIX
router.delete('/:user/:id', (req, res) => {
    PostModel
    .deleteOne({_id: req.params.id})
    .then(data => {
        UserModel
        .updateOne({user: req.params.user}, {$pull: {posts: {$in: [req.params.id]}}})
        .then(data => {res.json(data);})
        .catch(err => {res.json({message: err});});

        console.log(req.params.id)
    })
    .catch(err => {res.json({message: err});});
});

module.exports = router;