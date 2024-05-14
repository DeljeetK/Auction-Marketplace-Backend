const Product = require('../models/product');
const { STATUS_CODES } = require('../utils/statusCode.utils');
const Messages = require('../utils/message.utils')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response.utils');
const { storeData, findDocument, updateDocument } = require('../services/db.service');

exports.createProduct = async (req, res) => {
    try {
        const images = req.files.map(file => `http://localhost:4567/productImages/${file.filename}`);
        // courtDetails.courtImages = req.files.map(file => file.filename);
        const {
            productName,
            price,
            location,
            description,
            category,
            technicalSpecs,
            createdBy,
        } = req.body;
        const newProduct = new Product({
            productName,
            price,
            location,
            images,
            description,
            category,
            technicalSpecs: JSON.parse(technicalSpecs),
            createdBy,
        });

        const product = await storeData(Product, newProduct);
        sendSuccessResponse(res, STATUS_CODES.CREATED, 'Product created successfully!', product);
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.query.id;
        const product = await findDocument(Product, { _id: productId });
        if ( !product ) {
            const error = new Error(Messages.PRODUCT_NOT_FOUND);
            error.statusCode = STATUS_CODES.NOT_FOUND;
            throw error;
        }
        let result = await updateDocument(Product, { _id: productId }, { isDeleted: true });
        sendSuccessResponse(res, STATUS_CODES.NOT_FOUND, Messages.PRODUCT_DELETED, result);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
}