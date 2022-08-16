function deleteImage(element) {
    element.parentNode.remove();
    // add input hidden to form with image_id
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'images_deleted_id');
    input.setAttribute('value', element.getAttribute('data-imageId'));
    document.getElementById('form-edit-product').appendChild(input);
}