const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Create link Follower y Following
router.post('/', (req, res) => {
    UserModel
    .updateOne({user: req.body.user}, {$addToSet: {"following": req.body.following}})
    .then(data => {
        UserModel
        .updateOne({user: req.body.following}, {$addToSet: {"followers": req.body.user}})
        .then(data => {res.json(data);})
        .catch(err => {res.json({message: err});});
    })
    .catch(err => {res.json({message: err});});
});

// Get array of followers of an user
router.get('/followers/:user', (req, res) => {
    UserModel
    .findOne({user: req.params.user})
    .then(data => {res.json(data.followers);})
    .catch(err => {res.json({message: err});});
});

// Get array of following of an user
router.get('/following/:user', (req, res) => {
    UserModel
    .findOne({user: req.params.user})
    .then(data => {res.json(data.following);})
    .catch(err => {res.json({message: err});});
});

// Delete link Follower y Following
router.delete('/', (req, res) => {
    UserModel
    .updateOne({user: req.body.user}, {$pull: {"following": req.body.following}})
    .then(data => {
        UserModel
        .updateOne({user: req.body.following}, {$pull: {"followers": req.body.user}})
        .then(data => {res.json(data);})
        .catch(err => {res.json({message: err});});
    })
    .catch(err => {res.json({message: err});});
});

module.exports = router;