const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: require('./config.json').username,
        pass: require('./config.json').password,
    },
});

module.exports = {
    transporter: transporter,
};