function getSlug(data) {
    return data.replace(/ /g, '-').toLowerCase();
}

module.exports = {
    getSlug
};