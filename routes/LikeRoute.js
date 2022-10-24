const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');

// (CREATE) Like a post by post id and user id
router.post('/', async (req, res) => {
    const {userId, postId} = req.body;
    try {
        const user = await UserModel.findById(userId);
        const post = await PostModel.findById(postId);
        if (!user || !post) {
            return res.status(400).json({message: 'User or post not found'});
        }
        if (user.likes.includes(postId)) {
            return res.status(400).json({message: 'Post already liked'});
        }   
        user.likes.push(postId);
        post.likes.push(userId);
        post.likesCount = post.likes.length;
        await user.save();
        await post.save();
        res.status(200).json({message: 'Post liked'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Read all likes by user id
router.get('/:userId', async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const likes = await PostModel.find({ _id: { $in: user.likes } });
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// (DELETE) Unlike a post by post id and user id
router.delete('/', async (req, res) => {
    const {userId, postId} = req.body;
    try {
        const user = await UserModel.findById(userId);
        const post = await PostModel.findById(postId);
        if (!user || !post) {
            return res.status(400).json({message: 'User or post not found'});
        }
        if (!user.likes.includes(postId)) {
            return res.status(400).json({message: 'Post not liked'});
        }
        user.likes = user.likes.filter(id => id !== postId);
        post.likes = post.likes.filter(id => id !== userId);
        post.likesCount = post.likes.length;
        await user.save();
        await post.save();
        res.status(200).json({message: 'Post unliked'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});



module.exports = router;