// know if the user is invited
function isGuest(session) {
    return !session.user;
}
// know if the user is logged in
function isLoggedIn(session) {
    return !!session.user;
}

module.exports = {
    isGuest,
    isLoggedIn
}