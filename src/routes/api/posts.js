const express = require('express');
const router = express.Router();
const tweet = require("../../models/TweetSchema");
const User = require('../../models/userSchema');

router.get('/', (req, res) => {
    tweet.find()
    .populate('postedBy')
    .sort({'createdAt':-1})
    .then((results) =>{
        return res.status(200).send(results);
    })
    .catch(error =>{
        console.log(error);
        res.sendStatus(400);
    } )
})

router.put('/:id/like', async(req, res) =>{

    let postId = req.params.id;
    let userId = req.session.user._id;

    let isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    let option = isLiked ? '$pull' : '$addToSet';
    // insert the user like
    req.session.user = await User.findByIdAndUpdate(userId, {[option]: {likes: postId}}, {new: true})
    .catch((error) =>{
        console.log(error);
        res.sendStatus(400);
    })
    // insert the post like
    let post = await tweet.findByIdAndUpdate(postId, {[option] : {likes: userId}}, {new: true})
    .catch((error) =>{
        console.log(error);
        res.sendStatus(400);
    })
    res.status(200).send(post);
})
router.post('/:id/retweet', async(req, res) =>{
    res.status(200).send('send retweet');

    let postId = req.params.id;
    let userId = req.session.user._id;

    let isLiked = req.session.user.likes && req.session.user.likes.includes(postId);

    let option = isLiked ? '$pull' : '$addToSet';
    // insert the user like
    req.session.user = await User.findByIdAndUpdate(userId, {[option]: {likes: postId}}, {new: true})
    .catch((error) =>{
        console.log(error);
        res.sendStatus(400);
    })
    // insert the post like
    let post = await tweet.findByIdAndUpdate(postId, {[option] : {likes: userId}}, {new: true})
    .catch((error) =>{
        console.log(error);
        res.sendStatus(400);
    })
    res.status(200).send(post);
})

router.post('/', async (req, res) => {

    if(!req.body.content){
        console.log("content param not sent with request");
        return res.sendStatus(400);
    }
    let data = {
        content: req.body.content,
        postedBy: req.session.user,
    }
    tweet.create(data)
    .then(async (newPost) =>{
        newPost = await User.populate(newPost, {path: 'postedBy'})
        res.status(201).send(newPost);
    })
    .catch(err =>{
        console.log("error:", err);
        res.sendStatus(400);
    })

})

module.exports = router;

