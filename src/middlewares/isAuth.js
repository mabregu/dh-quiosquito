// valid that is authenticated
function isAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = isAuth;