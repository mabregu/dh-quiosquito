const db  = require('../database/models');
const ImageModel = {
    getAll: async () => {
        const imageList = await db.Image.findAll({
            include: ['products'],
            where: { deletedAt: null }
        });

        return imageList;
    },
    find: async (id) => {
        const image = await db.Image.findByPk(id, {
            include: ['products'],
            where: {
                deletedAt: null
            }
        });

        return image;
    },
    delete: (id) => {
        try {
            let deleted = db.Image.update({
                deletedAt: new Date()
            }, {
                where: {
                    id: id
                }
            });

            return deleted;
        } catch (error) {
            return { 
                error, 
                message: 'Error deleting image',
                success: false
            };
        }
    },
    store: async (data) => {
        let images = data.map((file) => {
            return {
                name: file.originalname,
                type: file.mimetype,
                size: file.size,
                path: '/img/uploads/' + file.filename,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        })

        try {
            let rs = await db.Image.bulkCreate(images);

            return rs;
        } catch (error) {
            return { error, message: 'Error creating image', success: false };
        }
    }
}

module.exports = ImageModel;