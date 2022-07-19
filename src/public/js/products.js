function deleteProduct(element) {
    let slug = element.getAttribute('data-slug');
    let product = document.getElementById("product-" + slug);
    product.remove();
}

function favorite(element) {
    let isFavorite = element.getAttribute('data-favorite');
    let iconHeart = element.children[0];

    if (isFavorite === "false") {
        element.setAttribute('data-favorite', "true");
        element.classList.add('favorite');
        iconHeart.classList.remove('text-gray-500');
        iconHeart.classList.add('text-red-500');
    } else {
        element.setAttribute('data-favorite', "false");
        element.classList.remove('favorite');
        iconHeart.classList.remove('text-red-500');
        iconHeart.classList.add('text-gray-500');
    }
}