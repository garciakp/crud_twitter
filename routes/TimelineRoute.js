const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');

// Read timeline: get all posts ordered by date from users followed by user id
router.get('/:userId', async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const posts = await PostModel.find({ userId: { $in: user.following } }).sort({date: -1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


module.exports = router;