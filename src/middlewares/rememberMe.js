module.exports = function (req, res, next) {
    
    if (req.session.user) {
        res.locals.user = req.session.user;
        if (req.session.user.role_id == 1) {
            req.session.user.isAdmin = true;
            res.locals.user.isAdmin = true;
        }
    }
        
    if (req.cookies.user && ! req.session.user) {
        req.session.user = JSON.parse(req.cookies.user);
    }

    next();
}