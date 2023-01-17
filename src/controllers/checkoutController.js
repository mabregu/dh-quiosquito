const mp = require('../services/mercadopago');
const crater = require('../services/crater');

const checkoutController = {
    index: (req, res) => {
        res.render('checkout/index');
    },
    process: async (req, res) => {
        try {
            const { items, installments, shipments } = req.body;
            req.session.cart = items;
            let preference = await mp(items, installments, shipments);
            let customer = req.session.user;
            
            // Save customer in external API
            crater.createCustomer(customer)
                .then(response => response.json())
                .then(result => console.log("Customer created: ", result.data))
                .catch(error => console.log('error', error))
            ;
            
            res.json({ link: preference.body.init_point});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    success: (req, res) => {
        //http://localhost:3000/checkout/success?collection_id=1309015732&collection_status=approved&payment_id=1309015732&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=6305385862&preference_id=95168702-be42a4a8-a365-4a46-a2ba-a1373cddd04b&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
        res.render('checkout/success');
    },
    failure: (req, res) => {
        res.render('checkout/failure', { payment: req.query });
    },
    pending: (req, res) => {
        res.render('checkout/pending');
    }
}

module.exports = checkoutController;