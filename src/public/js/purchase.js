// Save purchase
function savePurchase(status) {
    let cart = getCart();
    let total = getSubtotal(cart);
    
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