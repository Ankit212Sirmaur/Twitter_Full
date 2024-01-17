const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/user");
const bcrypt = require("bcrypt");

app.set("view engine", "pug");
app.set("views", "views");

router.get('/', (req, res) => {
    res.status(200).render('login');
})

router.post('/', async (req, res) => {
    var playlod = req.body;

    if (req.body.logUsername && req.body.logPassword) {
        let user = await User.findOne({
            $or: [
                { userName: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
            .catch(err => {
                console.log(err);
                playlod.errorMessage = "User not Found...Please create a new account";
                res.status(200).render('login', playlod);
            });

        if (user != null) {
            let result = await bcrypt.compare(req.body.logPassword, user.password);

            if (result === true) {
                req.session.user = user;
                return res.redirect('/');
            }
        }
        playlod.errorMessage = "login credentials incorrect";
        return res.status(200).render('login', playlod);
    }
    playlod.errorMessage = "Please Make sure each input have valid value";
    res.status(200).render('login');
})

module.exports = router;

