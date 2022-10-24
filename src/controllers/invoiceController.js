const Invoice = require('../models/invoiceModel');
const invoiceController = {
    index: (req, res) => {
        res.render('invoice/index');
    },
    create: async (req, res) => {
        try {
            
            let invoice = {
                user_id: req.session.user.id,
                total: req.body.total,
                status: req.body.status,
                items: req.session.cart
            };
            
            invoice.id = await Invoice.create(invoice);
            
            return res.json({
                status: 'ok',
                message: 'Invoice created'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    show: async (req, res) => {
        try {
            let invoice = await Invoice.find(req.params.id);
            
            return res.render('customers/invoice/show', { invoice });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
}

module.exports = invoiceController;