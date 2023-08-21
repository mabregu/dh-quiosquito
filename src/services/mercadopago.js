const mercadopago = require('mercadopago');

// Agrega credenciales
const access_token = process.env.MP_ACCESS_TOKEN || 'TEST-1234567890123456-123456-1234567890123456';
const server = process.env.SERVER || 'http://localhost:3000';
const success = `${server}/checkout/success`;
const failure = `${server}/checkout/failure`;
const pending = `${server}/checkout/pending`;

const mp = async (items, installments, shipments) => {
    try {
        // MP configure
        mercadopago.configure({ access_token });
        // Crea un objeto de preferencia
        const preference = {
            // items: [
            //     {
            //         title: 'Mi producto',
            //         unit_price: 100,
            //         quantity: 1,
            //     }
            // ],
            items,
            back_urls: { success, failure, pending },
            auto_return: 'approved',
            payment_methods: {
                excluded_payment_methods: [
                    { id: 'amex' }
                ],
                excluded_payment_types: [
                    { id: 'atm' }
                ],
                // installments: 6,
                installments
            },
            shipments: {
                cost: shipments,
                mode: 'not_specified',
            },
            // notification_url: `${server}/cart/checkout/notification`,
            // external_reference: '1234'
        };
        
        return await mercadopago.preferences.create(preference);
    } catch (error) {
        console.log(error);
    }
};

module.exports = mp;