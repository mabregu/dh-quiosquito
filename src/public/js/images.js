function deleteImage(element) {
    let url = ""
    element.parentNode.remove();
    // add input hidden to form with image_id
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'images_deleted_id');
    input.setAttribute('value', element.getAttribute('data-imageId'));
    document.getElementById('form-edit-product').appendChild(input);
}

function areYouSureDeleteImage(product) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
    .then((result) => {
        if (result.isConfirmed) {
            deleteImage(product);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}