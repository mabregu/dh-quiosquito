const cartController = {
    index: (req, res) => {
        res.render('cart/index');
    },
    checkout: (req, res) => {
        res.render('cart/checkoutMP');
    },
    processCheckout: (req, res) => {
        res.redirect('/cart');
    }
}

module.exports = cartController;