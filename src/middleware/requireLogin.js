const login = (req, res) =>{
    if(req.session && req.session.user){
        return next();
    } else {
        return res.redirect('/login');
    }
}

module.exports = login