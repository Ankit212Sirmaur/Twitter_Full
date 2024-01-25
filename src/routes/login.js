const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

app.set("view engine", "pug");
app.set("views", "views");

router.get('/', (req, res) => {
    res.status(200).render('login');
})

router.post('/', async (req, res) => {
    var playload = req.body;

    if (req.body.logUsername && req.body.logPassword) {
        let user = await User.findOne({
            $or: [
                { userName: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
            .catch(err => {
                console.log(err);
                playload.errorMessage = "User not Found...Please create a new account";
                res.status(200).render('login', playload);
            });

        if (user != null) {
            let result = await bcrypt.compare(req.body.logPassword, user.password);

            if (result === true) {
                req.session.user = user;
                return res.redirect('/');
            }
        }
        playload.errorMessage = "login credentials incorrect";
        return res.status(200).render('login', playload);
    }
    playload.errorMessage = "Please Make sure each input have valid value";
    res.status(200).render('login');
})

module.exports = router;

