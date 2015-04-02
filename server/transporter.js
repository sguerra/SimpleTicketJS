var nodemailer = require('nodemailer');

var config = require('./config');

var transporter = nodemailer.createTransport({
	host: config.HOST,
	port: config.PORT,
	secure: true,
    auth: {
        user: config.SENDER_EMAIL_ADRESS,
        pass: config.SENDER_EMAIL_PASS
    }
});

module.exports = transporter;
