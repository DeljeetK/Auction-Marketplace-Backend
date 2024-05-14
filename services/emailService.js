const nodemailer = require("nodemailer");
const emailTemplate = require('./email_template'); // Importing the email template function


exports.sendemail = async (recipient, subject, link, token) => {
    const url = `${link}?auth=${token}`;
    // Generate email body using the template function
    const emailBody = emailTemplate(url, subject, `Click the below link to ${subject}`);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: 'nitinsbisht2027@gmail.com',
            pass: 'wksq ylvo cfly oymv',
        },
    });

    let mailOptions = {
        from: 'nitinsbisht2027@gmail.com',
        to: recipient,
        subject: subject,
        html: emailBody
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
};
