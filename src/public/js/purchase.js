// Save purchase
function savePurchase(status) {
    let cart = getCart();
    let total = getSubtotal(cart);
    //http://localhost:3000/checkout/success?collection_id=1309015732&collection_status=approved&payment_id=1309015732&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=6305385862&preference_id=95168702-be42a4a8-a365-4a46-a2ba-a1373cddd04b&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
    let purchase = {
        cart,
        total,
        status
    };
    
    fetch('/invoice/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchase)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                //window.location.href = `/invoice/${data.invoiceId}`;
            }
        })
        .catch(error => console.error(error))
    ;
}