exports.generateOtp = async () => {
    return Math.floor((Math.random()*1000000)+1)
}

