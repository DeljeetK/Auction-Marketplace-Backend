const bcrypt = require("bcrypt")
const config = require('../config/config');

exports.hashData = async function(data) {
    const salt = await bcrypt.genSalt(config.saltRounds.rounds);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
}

exports.compareData = async function(data, encryptedData) {
    const isMatch = await bcrypt.compare(data, encryptedData);
    return isMatch;
}