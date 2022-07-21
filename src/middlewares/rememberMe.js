module.exports = function (req, res, next) {
    if (req.cookies.user && ! req.session.user) {
        req.session.user = JSON.parse(req.cookies.user);
    }

    next();
}