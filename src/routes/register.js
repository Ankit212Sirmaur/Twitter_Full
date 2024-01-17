const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const session = require("express-session");
const app = express();
const User = require("../models/user");

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res) => {
  res.status(200).render("register");
});

router.post("/", async (req, res) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let email = req.body.email.trim();
  let userName = req.body.userName.trim();
  let password = req.body.password;

  var playload = req.body;

  if (firstName && lastName && email && userName && password) {
    let user = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    }).catch((err) => {
      playload.errorMessage = "something went wrong while registering";
      res.status(200).render("register", playload);
    });

    if (user == null) {
      let data = req.body;

      User.create(data).then((user) => {
        req.session.user = user;
        return res.redirect("/");
      });
    } else {
      if (email == user.email) {
        playload.errorMessage = "email aready registered withsomeone";
      } else {
        playload.errorMessage = "userName already in use";
      }
      res.status(200).render("register", playload);
    }
    // console.log(user);
    // .then(user =>{
    //     console.log(user);
    // })
    // Mongoose queries are not promises. However, they do have a . then() function for yield and async/await.
    // because
  } else {
    playload.errorMessage = "Make sure each field have valid value";
    res.status(200).render("register", playload);
  }
});

module.exports = router;
