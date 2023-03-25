const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Todo1: Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // Todo2: Define the email options
  const mailOptions = {
    from: 'Minh Duy DEV <minhduy@dev.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // Todo3: Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
