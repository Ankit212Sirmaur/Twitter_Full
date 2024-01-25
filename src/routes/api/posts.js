const express = require('express');
const router = express.Router();
const tweet = require("../../models/TweetSchema");
const User = require('../../models/userSchema');

router.get('/', (req, res) => {
    tweet.find()
    .populate('postedBy')
    .then((results) =>{
        return res.status(200).send(results);
    })
    .catch(error =>{
        console.log(error);
        res.sendStatus(400);
    } )
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

