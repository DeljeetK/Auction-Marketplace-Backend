const User = require('../models/user');
const { STATUS_CODES } = require('../utils/statusCode.utils');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response.utils');
const { findDocuments, updateDocument, findDocument, findList } = require('../services/db.service');
const Messages = require('../utils/message.utils');

exports.listUsers = async (req, res) => {
    try {
        const userlist = await findDocuments(User, {});
        if (!userlist) {
            const error = new Error(Messages.USER_NOT_EXISTS);
            error.statusCode = STATUS_CODES.USER_NOT_EXISTS;
            throw error;
        }
        sendSuccessResponse(res, STATUS_CODES.USER_FETCHED, Messages.USER_FETCHED, userlist);
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
}
// Listing with pagination
// exports.listUsers = async (req, res) => {
//     try {
//         const page = req.query.page || 1; // Default to page 1 if not provided
//         const pageSize = req.query.pageSize || 5; // Default page size to 5 if not provided

//         const skip = (page - 1) * pageSize;
//         const limit = parseInt(pageSize);
//         console.log(page, pageSize, skip, limit);
//         const userlist = await findList(User, {}, { skip, limit });

//         if (!userlist || userlist.length === 0) {
//             const error = new Error(Messages.USER_NOT_EXISTS);
//             error.statusCode = STATUS_CODES.USER_NOT_EXISTS;
//             throw error;
//         }

//         sendSuccessResponse(res, STATUS_CODES.USER_FETCHED, Messages.USER_FETCHED, userlist);
//     } catch (error) {
//         sendErrorResponse(res, error.statusCode || 500, error.message);
//     }
// }
exports.updateUser = async (req, res) => {
    try {
        const userId = req.query.id;
        const updateData = req.body; 
        const {email} = req.body;
        const ifExist = await findDocument(User, {_id: userId});
        const phobitEmail = ifExist.email !== email;
        console.log(phobitEmail, "value of email");
        if (!ifExist) {
            const error = new Error(Messages.USER_NOT_FOUND);
            error.statusCode = STATUS_CODES.NOT_FOUND;
            throw error;
        }
        else if(email && phobitEmail){
            const error = new Error(Messages.EMAIL_CANNOT_UPDATED);
            error.statusCode = STATUS_CODES.NOT_AUTHORIZED;
            throw error;
        }
        const result = await updateDocument(User, { _id: userId }, { $set: updateData });
        sendSuccessResponse(res, STATUS_CODES.USER_UPDATED, Messages.USER_UPDATED, null);
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
}
exports.userDetails = async (req, res) => {
    try {
        const userId = req.query.id;
        const user =  await findDocument(User, {_id: userId});
        if (!user) {
            const error = new Error(Messages.USER_NOT_FOUND);
            error.statusCode = STATUS_CODES.NOT_FOUND;
            throw error;
        } 
        sendSuccessResponse(res, STATUS_CODES.USER_UPDATED, Messages.USER_UPDATED, user);
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
}