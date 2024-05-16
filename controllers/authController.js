const User = require('../models/user');
const { STATUS_CODES } = require('../utils/statusCode.utils');
const { hashData, compareData } = require('../services/bcrypt.service');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response.utils');
const { findDocument, storeData, updateDocument } = require('../services/db.service');
const Messages = require('../utils/message.utils');
const { sendEmail } = require('../services/email.service');
const { generateOtp } = require('../services/otp.service');
const { generateToken } = require('../services/token.service');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { sendemail } = require('../services/emailService')

// Controller for user signup.
exports.createUser = async (req, res) => {
    const { firstName, lastName, email, address, postalCode, country, city, password, userType, conditions } = req.body;
    try {
        let isExist = await findDocument(User, { email });
        if (isExist) {
            const error = new Error(Messages.USER_ALREADY_EXISTS);
            error.statusCode = STATUS_CODES.USER_ALREADY_EXISTS;
            throw error;
        }
        let hashedPassword = await hashData(password);
        const newUser = new User({
            firstName,
            lastName,
            email,
            address,
            postalCode,
            city,
            country,
            password: hashedPassword,
            userType,
            conditions,
        });
        const user = await storeData(User, newUser);
        const otp = await generateOtp();
        const sendOtp = await sendEmail(email, "Verify your email", otp);
        const otpToken = await generateToken({ otp, email }, config.token.JWT_SECRET, '1h');
        const response = {
            user: user,
            otpToken: otpToken
        };
        sendSuccessResponse(res, STATUS_CODES.USER_CREATED, Messages.USER_CREATED, otpToken);
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findDocument(User, { email });
        if (!user) {
            const error = new Error(Messages.WRONG_CREDENTIALS_ENTERED);
            error.statusCode = STATUS_CODES.WRONG_CREDENTIALS_ENTERED;
            throw error;
        }
        const passwordMatch = await compareData(password, user.password);
        if (!passwordMatch) {
            const error = new Error(Messages.WRONG_CREDENTIALS_ENTERED);
            error.statusCode = STATUS_CODES.WRONG_CREDENTIALS_ENTERED;
            throw error;
        }
        const token = generateToken({ userId: user._id }, config.token.JWT_SECRET, '1h');
        let response = {token, userId: user._id}
        sendSuccessResponse(res, STATUS_CODES.LOGIN_SUCCESS, Messages.LOGIN_SUCCESS, response);
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
};
exports.changePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const userId = req.query.id;
        const ifExist = await findDocument(User, { _id: userId });
        if (!ifExist) {
            const error = new Error(Messages.USER_NOT_EXISTS);
            error.statusCode = STATUS_CODES.USER_NOT_EXISTS;
            throw error;
        }
        const passwordMatch = await compareData(password, ifExist.password);
        if (!passwordMatch) {
            const error = new Error(Messages.OLD_PASSWORD_NOT_MATCHED);
            error.statusCode = STATUS_CODES.PASSWORD_NOT_MATCHED;
            throw error;
        }
        let hashedPassword = await hashData(newPassword);
        let updateData = {
            password: hashedPassword
        }
        let result = await updateDocument(User, { _id: userId }, { $set: updateData });
        sendSuccessResponse(res, STATUS_CODES.USER_UPDATED, Messages.USER_UPDATED, result);
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
}
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await findDocument(User, { email });
        let token = '';
        if (user) {
            token = generateToken(
                { userId: user._id, userEmail: user.email },
                config.token.JWT_SECRET,
                "1h"
            );
            const url = `http://172.24.11.143:3000/reset-password`;

            await sendemail(
                email,
                "Reset Your Password",
                url,
                token
            );
        }
        sendSuccessResponse(
            res,
            STATUS_CODES.EMAIL_SENT,
            Messages.EMAIL_SENT_SUCCESSFULLY,
            token
        );
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.message || "Internal Server Error");
    }
}
exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const hashedPassword = await hashData(newPassword);
        const user = await findDocument(User, { email });
        let updateData = {
            password: hashedPassword
        }
        let result = await updateDocument(User, { _id: user._id }, { $set: updateData });
        sendSuccessResponse(res, STATUS_CODES.PASSWORD_CHANGED, Messages.PASSWORD_CHANGED, result);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
}
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await findDocument(User, { _id: userId });
        if (!user) {
            const error = new Error(Messages.USER_NOT_EXISTS);
            error.statusCode = STATUS_CODES.USER_NOT_EXISTS;
            throw error;
        }
        let result = await updateDocument(User, { _id: userId }, { isDeleted: true });
        sendSuccessResponse(res, STATUS_CODES.USER_UPDATED, Messages.USER_DELETED, result);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, error.statusCode || 500, error.message);
    }
}