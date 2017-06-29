var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var express    =    require('express');
var app        =    require('./../app');

var mailAccountUser = 'pietraman@piet.co.in'
var mailAccountPassword = 'hackraman'

// main work is done by this smtpTransport so at new signup the value of to toEmailAddress should be
// equal to the Users[0].email  you the know the best.
var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
}))
/* to create custom services
var smtpTransport = nodemailer.createTransport('SMTP', {
    host: 'yourserver.com',
    port: 25,
    auth: {
        user: 'username',
        pass: 'password'
    }
});*/

module.exports = function(from,to,message) {
  var mail = {
    from: from,
    to: to,
    subject: "Welcome To NIEM",
    text: "no",
    html: message
  }
  transport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    transport.close();
  });
}
