const express = require('express');
const router = express.Router();
const app = express();
const User = require('../models/user');
app.set("view engine", "pug");
app.set("views", "views");

router.get('/', (req, res) =>{
    res.status(200).render('register');
})
router.post('/', (req, res) =>{
    console.log(req.body);

    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let email = req.body.email.trim();
    let userName = req.body.userName.trim();
    let password = req.body.password;

    var playload = req.body;

    if(firstName && lastName &&  email && userName && password){
       User.findOne({
            userName:userName
        })
        .then(user =>{
            console.log(user);
        })
        console.log('hello');
    } else {
        playload.errorMessage = "Make sure each field have valid value";
        res.status(200).render('register', playload);
    }
})

module.exports = router;