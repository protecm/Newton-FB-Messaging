const _FROM = "newton@facebook.com";
const _TO = "yonik258@walla.com";
const _SUBJECT = "Hi newton";
const _PLAIN_TXT_BODY = "Hiii";
const _HTML_BODY = "Hiii";

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    host: 'localhost',
    port: 25
}));



// setup e-mail data with unicode symbols
var mailOptions = {
    from: _FROM, // sender address
    to: _TO, // list of receivers
    subject: _SUBJECT, // Subject line
    html: _HTML_BODY,
    text: _PLAIN_TXT_BODY
};


// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});