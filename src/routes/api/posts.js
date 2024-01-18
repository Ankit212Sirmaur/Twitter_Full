const express = require('express');
const router = express.Router();
const User = require("../../models/user");

router.get('/', (req, res) => {
    
})

router.post('/', async (req, res) => {

    if(!req.body.content){
        console.log("content param not sent with request");
         res.sendStatus(400);
    }

    res.status(200).send("it worked");

})

module.exports = router;

