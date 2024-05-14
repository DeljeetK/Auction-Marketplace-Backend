const Joi = require('joi');
const { STATUS_CODES } = require('../utils/statusCode.utils');
const { sendErrorResponse } = require('../utils/response.utils');

// signup function for validation.
const validateSignup = async (req, res, next) => {
    try {
        const signupSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            address: Joi.string().required(),
            postalCode: Joi.number().required(),
            city: Joi.string().required(),
            country: Joi.string().required(),
            password: Joi.string()
                .min(8)
                .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/)
                .required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
            userType: Joi.string().required(),
            conditions: Joi.boolean(),
        });
        const { error, value } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            throw error;
        }
        return next();
    }
    catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.details[0].message || 'Internal Server error')
    }
};
const validateLogin = async (req, res, next) => {
    try {
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .min(8)
                .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/).required(),
        })
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            throw error;
        }

        return next();
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.details[0].message || 'Internal Server error')
    }
}
const validateChangePassword = async (req, res, next) => {
    try {
        const changePasswordSchema = Joi.object({
            password: Joi.string()
                .min(8)
                .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/).required(),
            newPassword: Joi.string()
                .min(8)
                .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/).required(),
            confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
        })
        const { error } = changePasswordSchema.validate(req.body, { abortEarly: false });
        if (error) {
            throw error;
        }

        return next();
    } catch (error) {
        sendErrorResponse(res, error.statusCode || 500, error.details[0].message || 'Internal Server error')
    }
}
const validateUpdateUserProfile = async (req, res, next) => {
    try {
        const updateUserProfileSchema = Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            address: Joi.string(),
            postalCode: Joi.number(),
            city: Joi.string(),
            country: Joi.string(),
            password: Joi.string()
                .min(8)
                .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/),
            confirmPassword: Joi.string().valid(Joi.ref('password')),
            conditions: Joi.boolean(),
        })
        const { error, value } = updateUserProfileSchema.validate(req.body, { abortEarly: false })
        if (error) {
            throw error;
        }
        return next();
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, error.statusCode || 500, error.details[0].message || 'Internal server error')
    }
}
const validateForgetPassword = async (req, res, next) => {
    try {
        const forgetPasswordSchema = Joi.object({
            email: Joi.string().email().required(),
        })
        const {error} = forgetPasswordSchema.validate(req.body, {abortEarly: false});
        if (error){
            throw error;
        }
        return next();
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, error.statusCode || 500, error.details[0].message || 'Internal server error')
    }
}
const validateResetPassword = async (req, res, next)=> {
    try {
        const resetPasswordSchema = Joi.object({
            newPassword: Joi.string()
                    .min(8)
                    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{8,}$/).required(),
            confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
        })
        const [error] = resetPasswordSchema.validate(req.body, {abortEarly: false});
        if (error) {
            throw error;
        }
        return next();
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, error?.statusCode || 500, error?.details[0]?.message || 'Internal server error')
    }
}
module.exports = {
    validateSignup,
    validateLogin,
    validateUpdateUserProfile,
    validateChangePassword,
    validateForgetPassword,
    validateResetPassword,
};
