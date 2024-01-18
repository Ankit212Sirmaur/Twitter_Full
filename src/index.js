const express = require('express');
const path = require('path');
const app = express();
const loginRoute = require('./routes/login');
const requireLogin = require('./middleware/requireLogin');
const registerRoute = require('./routes/register');
const bodyParser = require('body-parser');
const connect = require('./config/databaseConfig')
const user = require('./models/user');
const session = require('express-session');
const logoutRoute = require('./routes/logout')
const postApiRoute = require('./routes/api/posts');

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "my secreat gun",
    resave: false,
    saveUninitialized: false,
}));

app.use('/login', loginRoute);
app.use('/register', registerRoute)
app.use('/logout', logoutRoute);

app.use('/api/posts', postApiRoute);


app.get("/", requireLogin, (req, res) => {

    var playload = {
        pageTitle: "home",
        userLoggedIn: req.session.user,
    }
    res.status(200).render('home', playload);
})

let PORT = 2211;
app.listen(PORT, async () => {
    console.log("server started at", `${PORT}`);
    await connect();
})