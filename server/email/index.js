const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require("path");

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ncq998@gmail.com',
    pass: 'iloveha198'
  }
});
gmailTransporter.use('compile', hbs({
  viewPath: path.join(__dirname, "./templates"),
  extName: '.hbs',
  viewEngine: {
    partialsDir:  path.join(__dirname, "./templates/partials")
  }
}));

const emailServices = {
  gmail: gmailTransporter
};
const sendEmail = (service, options) => {
  let transporter = emailServices[service];
  return transporter.sendMail(options)
};

module.exports = {
  sendEmail
};