let cartPage = document.getElementById("cart");
let cartBtn = document.getElementById("cart-btn");
let cartBtnClose = document.getElementById("cart-btn-close");
let addToCartBtn = document.getElementById("add-to-cart-btn");
let cartList = document.getElementById("cart-list");
let cartCountNotification = document.getElementById("cart-count-notification");
let cartCountItems = document.getElementById("cart-count-items");
let cartSubtotal = document.getElementById("cart-subtotal");
let spaceCart = document.querySelectorAll('.pointer-events-auto');
let cartCheckoutBtn = document.getElementById("cart-btn-checkout");

addProductListToCart();
notificationCart();

/**
 * Evento para mostrar el carrito de compras cuando hace click en el boton de carrito
 */
cartBtn.onclick = () => {
    cartPage.classList.toggle("cart-show");
    cartPage.classList.toggle("cart-hide");
};

/**
 * Evento para ocultar el carrito de compras cuando hace click en el boton de cerrar
 */
cartBtnClose.onclick = () => {
    cartPage.classList.toggle("cart-show");
    cartPage.classList.toggle("cart-hide");
};


if (addToCartBtn) {
    addToCartBtn.onclick = (e) => {
        e.preventDefault();
        let product = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
            description: e.target.dataset.description,
            unit_price: e.target.dataset.price,
            currency_id: e.target.dataset.currency,
            image: e.target.dataset.image
        }
        
        updateOrCreateCart(product);
    };
}

cartCheckoutBtn.onclick = () => {
    
}

function addProductListToCart() {
    let productList = getCart();
    if (productList) {
        productList.forEach(product => addProductItem(product));
        cartSubtotal.innerText = getSubtotal(productList);
    }
}

function addProductItem(product) {
    let li = `
        <li id="cart-item-${product.id}" class="flex py-6 cart-item">
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src="${product.image}" 
                    alt="${product.name}" 
                    class="h-full w-full object-cover object-center"
                >
            </div>
            <div class="ml-4 flex flex-1 flex-col">
                <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                        <a href="#">${product.name}</a>
                    </h3>
                    <p class="ml-4">${product.currency_id} ${product.unit_price}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">${product.description}</p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">
                        Cantidad: <span id="cart-item-quantity-${product.id}">${product.quantity}</span>
                    </p>
                    <input type="number" class="form-input w-16 text-center" value="${product.quantity}" min="1" max="10" step="1" data-id="${product.id}" onchange="updateQuantity(this)" id="change-cart-item-quantity-${product.id}">
                    <div class="flex">
                        <button 
                            type="button" 
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                            onclick="removeItemCart('cart-item-${product.id}')"
                        >Remove</button>
                    </div>
                </div>
            </div>
        </li>
    `;

    cartList.innerHTML += li;
}

function removeItemCart(elementId) {
    document.getElementById(elementId).remove();
    let productList = getCart();
    let product = productList.find(p => p.id == elementId.split('-')[3]);
    let index = productList.indexOf(product);
    productList.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(productList));
    cartSubtotal.innerText = getSubtotal(productList);

    notificationCart();
}

function removeItems() {
    let items = document.querySelectorAll('.cart-item');

    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        item.remove();
    }

    localStorage.clear();
    cartSubtotal.innerText = 0.0;
    notificationCart();
}

function notificationCart() {
    cartCountItems.innerText = getCountItemsInCart();

    if (getCountItemsInCart()) cartCountNotification.style.backgroundColor = 'red';
    else cartCountNotification.style.backgroundColor = 'transparent';
}

function updateOrCreateCart(product) {
    let productList = getCart();
    if (productList) {
        let productFound = productList.find(p => p.id == product.id);
        if (productFound) {
            productFound.quantity += 1;
            document.getElementById(`cart-item-quantity-${product.id}`).innerText = productFound.quantity;
            document.getElementById(`change-cart-item-quantity-${product.id}`).value = productFound.quantity;
        } else {
            product.quantity = 1;
            productList.push(product);
            addProductItem(product);
        }
    } else {
        product.quantity = 1;
        productList = [product];
        addProductItem(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(productList));
    cartSubtotal.innerText = getSubtotal(productList);
    notificationCart();
}

function updateQuantity(element) {
    let productList = getCart();
    let productFound = productList.find(p => p.id == element.dataset.id);
    if (productFound) {
        productFound.quantity = element.value;
        document.getElementById(`cart-item-quantity-${productFound.id}`).innerText = productFound.quantity;
    }
    
    localStorage.setItem('cart', JSON.stringify(productList));
    cartSubtotal.innerText = getSubtotal(productList);
    notificationCart();
}

function getCountItemsInCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0;
}

function getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
}

function getSubtotal(cart) {
    return cart.map(item => item.quantity * item.unit_price).reduce((prev, curr) => prev + curr, 0);
}