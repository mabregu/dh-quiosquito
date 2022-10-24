const db = require('../database/models');

const InvoiceModel = {
    findAll: function () {
        const invoices = db.Invoice.findAll({
            where: {
                deletedAt: null
            }
        });

        return invoices;
    },
    find: function (id) {
        const invoice = db.Invoice.findByPk(id);

        return invoice;
    },
    create: function (invoice) {
        try {
            const newInvoice = db.Invoice.create(
                {
                    user_id: invoice.user_id,
                    total: invoice.total,
                    status: invoice.status,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    items: invoice.items
                },
                {
                    include: ['items']
                }
            );

            return newInvoice;
        } catch (error) {
            return { error, message: 'Error creating invoice' };
        }
    },
    update: function (id, data) {
        try {
            let currentInvoice = this.find(id);
            if (currentInvoice) {
                const invoice = db.Invoice.update(data, {
                    where: {
                        id: id
                    }
                });

                return invoice;
            } else {
                return { error: 'Invoice not found' };
            }
        } catch (error) {
            return { error, message: 'Error updating invoice' };
        }
    },
    delete: function (id) {
        try {
            let currentInvoice = this.find(id);
            if (currentInvoice) {
                const invoice = db.Invoice.destroy({
                    where: {
                        id: id
                    }
                });

                return invoice;
            } else {
                return { error: 'Invoice not found' };
            }
        } catch (error) {
            return { error, message: 'Error deleting invoice' };
        }
    }
};

module.exports = InvoiceModel;