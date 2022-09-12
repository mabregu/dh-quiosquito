function deleteImage(element) {
    let imageId = element.getAttribute("data-image-id");
    let url = "/api/images/" + imageId;

    fetch(url, { method: 'DELETE' })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                element.parentNode.remove();
            }
        })
        .catch(err => console.log(err))
    ;
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