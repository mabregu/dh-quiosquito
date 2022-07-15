function deleteProduct(element) {
    let slug = element.getAttribute('data-slug');
    let product = document.getElementById("product-" + slug);
    product.remove();
}