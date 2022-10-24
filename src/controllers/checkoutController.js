const mp = require('../services/mercadopago');

const checkoutController = {
    index: (req, res) => {
        res.render('checkout/index');
    },
    process: async (req, res) => {
        try {
            const { items, installments, shipments } = req.body;
            let preference = await mp(items, installments, shipments);
            
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            
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