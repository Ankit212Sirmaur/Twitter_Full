const express = require('express');
const path = require('path');
const app = express();
const loginRoute = require('./routes/login');
const requireLogin = require('./middleware/requireLogin');
const registerRoute = require('./routes/register');

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));


app.use('/login', loginRoute);
app.use('/register', registerRoute)

app.get("/", requireLogin, (req, res)=>{

    var palylod = {
        pageTitle: "home"
    }
    res.status(200).render('home', palylod)
})

let PORT = 2211;
app.listen(PORT, ()=>{
    console.log("server started at", `${PORT}`);
})