let search_form = document.getElementById("search_form");
let search_bar = document.getElementById("search_bar");
let content_products = document.getElementById("content_products");

search_form.addEventListener("submit", function (event) {
    event.preventDefault();
    let search_input = document.getElementById("search_input").value;
    let search_url = "/api/products/search/" + search_input;
    
    if (search_input == "") {
        window.location.reload();
    }
    
    fetch(search_url)
        .then(response => response.json())
        .then(result => {
            content_products.innerHTML = "";
            result.data.forEach(product => {
                content_products.innerHTML += createProductCard(product);
            });
        })
    ;
});

function createProductCard(product) {
    return `
        <div id="product-${product.slug}" class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <a href="/products/${product.slug}">
                <img
                    src="${product.images[0].path}"
                    class="hover:grow hover:shadow-lg object-cover h-48 w-96 rounded"
                >
            </a>
            <p style="color: #000; font-size: 1.2rem; font-weight: bold; margin-top: 0.5rem;">
                ${product.category.name}
            </p>
            <div class="pt-3 flex items-center justify-between">
                <p>${product.name}</p>
                <div class="pt-3 flex items-center">
                    <!-- product actions -->
                </div>
            </div>
            <p class="pt-1 text-gray-900">
                ${product.currency.code}
                ${product.price}
            </p>
        </div>
    `;
}