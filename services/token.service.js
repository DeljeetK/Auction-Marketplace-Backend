const jwt = require("jsonwebtoken");
const config = require('../config/config');

exports.generateToken = function (data = {}, secretKey, expiresIn = '1h') {
  return jwt.sign({ data }, secretKey, { expiresIn });
}

exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token ? token.split(" ") : "";
  token = token[1] ? token[1] : "";
  if (!token) {
    return res.json({
      status: "error",
      message: "Token not provided.",
      data: null,
    });
  }

  jwt.verify(token, config.token.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        status: 'error',
        message: "Otp expired",
        data: null
      });
    }
    req.user = decoded;
    next();
  });
};