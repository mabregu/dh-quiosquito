const mp = require('../services/mercadopago');
const Invoice = require('../database/models/Invoice');

const checkoutController = {
    index: (req, res) => {
        res.render('checkout/index');
    },
    process: async (req, res) => {
        try {
            const { items, installments, shipments } = req.body;
            req.session.cart = items;
            let preference = await mp(items, installments, shipments);
            
            res.json({ link: preference.body.init_point});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    success: (req, res) => {
        res.render('checkout/success', { payment: req.query.payment_id });
    },
    failure: (req, res) => {
        res.render('checkout/failure', { payment: req.query });
    },
    pending: (req, res) => {
        res.render('checkout/pending');
    }
}

module.exports = checkoutController;