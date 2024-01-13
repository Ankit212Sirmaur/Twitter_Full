const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

app.set("view engine", "pug");
app.set("views", "views");
// app.set('views', path.join(__dirname, 'views'));

router.get('/', (req, res) =>{
    res.status(200).render('login');
})

module.exports = router;

