// User is admin
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role_id == 1) {        
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = isAdmin;