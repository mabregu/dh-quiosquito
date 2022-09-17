let cartPage = document.getElementById("cart");
let cartBtn = document.getElementById("cart-btn");
let cartBtnClose = document.getElementById("cart-btn-close");
let addToCartBtn = document.getElementById("add-to-cart-btn");
let cartList = document.getElementById("cart-list");
let cartCountNotification = document.getElementById("cart-count-notification");
let cartCountItems = document.getElementById("cart-count-items");
let cartSubtotal = document.getElementById("cart-subtotal");

addProductListToCart();
notificationCart();

cartBtn.onclick = () => {
    if (cartPage.style.display == "none" || cartPage.style.display == "") {
        cartPage.style.display = "block";
    } else {
        cartPage.style.display = "none";
    }
};

cartBtnClose.onclick = () => {
    if (cartPage.style.display == "block") {
        cartPage.style.display = "none";
    }
};

if (addToCartBtn) {
    addToCartBtn.onclick = (e) => {
        e.preventDefault();
        let product = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
            description: e.target.dataset.description,
            price: e.target.dataset.price,
            currency: e.target.dataset.currency,
            image: e.target.dataset.image
        }
        
        updateOrCreateCart(product);
    };
}

function addProductListToCart() {
    let productList = getCart();
    if (productList) {
        console.log("addProductListToCart", productList);
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
                    <p class="ml-4">${product.currency} ${product.price}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">${product.description}</p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                    <p id="cart-item-quantity-${product.id}" class="text-gray-500">${product.quantity}</p>
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
}

function updateOrCreateCart(product) {
    let newItem = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        currency: product.currency,
        image: product.image,
        quantity: 1
    };

    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let indexProductInCart = cart.findIndex(cartItem => cartItem.id == product.id);

        if (indexProductInCart !== -1) {
            cart[indexProductInCart].quantity++;
            document.getElementById('cart-item-quantity-' + product.id).innerText = cart[indexProductInCart].quantity;
        } else {
            cart.push(newItem);
            addProductListToCart();
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        cartSubtotal.innerText = getSubtotal(cart);
    } else {
        localStorage.setItem("cart", JSON.stringify([ newItem ]));
        addProductListToCart();
    }

    notificationCart();
}

function getCountItemsInCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0;
}

function getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
}

function getSubtotal(cart) {
    return cart.map(item => item.quantity * item.price).reduce((prev, curr) => prev + curr, 0);
}