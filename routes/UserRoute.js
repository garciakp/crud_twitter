const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

// Create user
router.post('/', (req, res) => {
    const user = UserModel({
        user: req.body.user,
        password: req.body.password,
});
    user
    .save()
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

// Read all users
router.get('/', (req, res) => {
    UserModel
    .find()
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

// Read specific user by id
router.get('/:id', (req, res) => {
    UserModel
    .findById(req.params.id)
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

// Update user
router.patch('/:id', (req, res) => {
    UserModel
    .updateOne({_id: req.params.id}, {$set: {user: req.body.user, password: req.body.password}})
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

// Delete user
router.delete('/:id', (req, res) => {
    UserModel
    .deleteOne({_id: req.params.id})
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

module.exports = router;