let cartPage = document.getElementById("cart");
let cartBtn = document.getElementById("cart-btn");
let cartBtnClose = document.getElementById("cart-btn-close");
let addToCartBtn = document.getElementById("add-to-cart-btn");

cartBtn.onclick = () => {
    console.log("cartBtn.onclick", cartPage.style.display);
    if (cartPage.style.display == "none" || cartPage.style.display == "") {
        cartPage.style.display = "block";
    } else {
        cartPage.style.display = "none";
    }
};

cartBtnClose.onclick = () => {
    console.log("cartBtnClose.onclick", cartPage.style.display);
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
            price: e.target.dataset.price,
            currency: e.target.dataset.currency,
            image: e.target.dataset.image
        }
        
        console.log("addToCartBtn.onclick", product);
    };
}