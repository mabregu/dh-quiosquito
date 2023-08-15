function deleteProduct(element) {
    let slug = element.getAttribute('data-slug');
    let product = document.getElementById("product-" + slug);
    let url = '/products/delete/' + slug;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            product.remove();
        } else {
            console.log(data);
        }

    })
    .catch(error => console.log(error));
}

function addFavorite(element) {
    let slug = element.getAttribute('data-slug');
    let url = '/products/favorite/' + slug;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("addFavorite", data);
        })
        .catch(error => console.log(error))
    ;
}

function favorite(element) {
    let isFavorite = element.getAttribute('data-favorite');
    let iconHeart = element.children[0];

    addFavorite(element);
    
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

function areYouSureDeleteProduct(product) {
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
            deleteProduct(product);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}