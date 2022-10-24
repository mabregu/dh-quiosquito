let formCheckout = document.getElementById('form-checkout');

if (formCheckout) {
    formCheckout.addEventListener('submit', (e) => {
        e.preventDefault();
        let items = toInt(getCart());
        let installments = 6;
        let shipments = 0;
        
        let data = JSON.stringify({
            items,
            installments,
            shipments
        });
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: myHeaders,
            body: data
        };
        
        fetch('/checkout/process', requestOptions)
            .then(response => response.json())
            .then(data => window.location.href = data.link)
            .catch(error => console.log(error))
        ;
    });
}

// Convertir precio del carrito de string a int
function toInt(cart) {
    cart.forEach(product => {
        product.unit_price = parseInt(product.unit_price);
        product.quantity = parseInt(product.quantity);
    });
    return cart;
}