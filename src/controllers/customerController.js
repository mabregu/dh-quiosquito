const Invoice = require('../../models/invoiceModel');
const customerController = {
    index: (req, res) => {
        res.render('customer/index');
    },
    purchase: async (req, res) => {
        let invoices = await Invoice.findByUser(req.session.user.id);
        
        res.render('customers/my_purchases', { invoices });
    }
};

module.exports = customerController;