const express = require('express');
const router = express.Router();
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

router.get('/', (req, res) =>{
    res.status(200).render('login');
})

module.exports = router;

