const nodemailer = require('nodemailer');

exports.sendEmail = async (recipient, subject, otp) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nitinsbisht2027@gmail.com',
        pass: 'wksq ylvo cfly oymv',
      },
    });
    const htmlContent = `Your Otp for verification is ${otp}`
    let mailOptions = {
      from: 'nitinsbisht2027@gmail.com',
      to: recipient,
      subject: subject,
      html: htmlContent,
    };
  
    try {
      let info = await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  };