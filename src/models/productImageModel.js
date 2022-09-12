const db  = require('../database/models');
const ProductImageModel = {
    store: async (productId, images) => {
        try {
            let productImage = await db.ProductImage.bulkCreate(
                images.map(image => {
                    return {
                        product_id: productId,
                        image_id: image.id
                    }
                })
            )

            return productImage;
        } catch (error) {
            return { error, message: 'Error creating image', success: false };
        }
    }
}

module.exports = ProductImageModel;