const ImageModel = require('../../models/imageModel');
const images = {
    list: async (req, res) => {
        try {
            return res.json({
                success: true,
                data: await ImageModel.getAll()
            });
        } catch (error) {
            return res.json({
                success: false,
                error: error.message 
            });
        }
    },
    show: async (req, res) => {
        try {
            return res.json({
                success: true,
                data: await ImageModel.find(req.params.id)
            });
        } catch (error) {
            return res.json({
                success: false,
                error: error.message 
            });
        }
    },
    destroy: async (req, res) => {
        try {
            return res.json({
                success: true,
                message: 'Destroyed successfully',
                data: await ImageModel.delete(req.params.id)
            });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Destroyed unsuccessfully',
                error: error.message 
            });
        }
    }
}

module.exports = images;