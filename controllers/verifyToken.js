const { verifyToken } = require('../services/token.service');
const { sendSuccessResponse , sendErrorResponse}= require('../utils/response.utils')
const Messages = require('../utils/message.utils');
const { STATUS_CODES } = require('../utils/statusCode.utils');

exports.verifyOtp = async (req, res) => {
    verifyToken(req, res, async (decoded) => {
        const { id } = req.user;
        const otpBody = req.body.otp;
        const  otp  = req.user.data.otp;
        if (otpBody == otp) {
            sendSuccessResponse(res, STATUS_CODES.OTP_VERIFICATION_SUCCESSFUL, Messages.OTP_VERIFICATION_SUCCESSFUL, req.user.data.email);
        }
        else {
            sendErrorResponse(res, STATUS_CODES.OTP_VERIFICATION_FAILED, Messages.OTP_VERIFICATION_FAILED, req.user.data.email);
        }
    })
}