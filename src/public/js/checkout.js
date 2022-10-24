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
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Credentials", "true");
        myHeaders.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        
        let requestOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        };
        
        fetch('/checkout/process', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.href = data.link;
            })
            .catch(error => console.log(error))
        ;
    });
}

// Convertir precio del carrito de string a int
function toInt(cart) {
    cart.forEach(product => {
        product.unit_price = parseInt(product.unit_price);
    });
    return cart;
}