const express = require('express');
const router = express.Router();
const UsersModel = require('../models/UserModel');

// Create user
router.post('/', (req, res) => {
    const user = UsersModel({
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
    UsersModel
    .find()
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

// Read specific user by id
router.get('/:id', (req, res) => {
    UsersModel
    .findById(req.params.id)
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

// Update user
router.patch('/:id', (req, res) => {
    UsersModel
    .updateOne({_id: req.params.id}, {$set: {user: req.body.user, password: req.body.password}})
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

// Delete user
router.delete('/:id', (req, res) => {
    UsersModel
    .deleteOne({_id: req.params.id})
    .then(data => {res.json(data);})
    .catch(err => {res.json({message: err});});
});

module.exports = router;