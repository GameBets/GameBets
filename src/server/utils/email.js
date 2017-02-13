var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var sg = require('./../../../sendgrid.env');
var emailTo = '';
var emailFrom = '';
var body = '';

exports.sendEmail = function(req, res) {

  switch (req.body.type) {
    case 'user':
      emailTo = req.body.from;
      emailFrom = 'infogamebets@gmail.com';

      body = '<body>' +
        '<div id="contact-email">' +
        '<div> <h1>Contacto con Gamebets</h1> <h4>Asunto: ' +
        req.body.subject +
        '</h4></div>' +
        '<section>' +
        '<p>El usuario ' +
        req.body.name +
        ' ' + ' Ha enviado un correo a nuestro equipo de soporte' +
        'el equipo de soporte de Gamebets, responderá su mail en breve, gracias.</p>' +
        '</div>' +
        ' </body>';
      break;

    case 'admin':
      emailTo = 'infogamebets@gmail.com';
      emailFrom = req.body.from;

      body = '<body>' +
        '<div id="contact-email">' +
        '<div> <h1>Contact with Gamebets</h1> <h4>Sugerence: ' + req.body.subject +
        '</h4></div>' +
        '<section>' +
        'Name:<h3>' + req.body.name + '</h3>' +
        'Email: <h3>' + req.body.from + '</h3>' +
        'Message:<h4>' + req.body.text + '</h4></section>' +
        '</div>' +
        ' </body>';
      break;
    }

  var template =
    '<html>' +
    '<head>' +
    '<meta charset="utf-8" />' +
    '</head>' + body +
    '</html>';

  var email = {
    from: emailFrom,
    to: emailTo,
    subject: req.body.subject,
    text: req.body.text,
    html: template
  };

  // APIKEY Sendgrid
  var options = {
    auth: {
      api_key: sg
    }
  };
  var mailer = nodemailer.createTransport(sgTransport(options));

  mailer.sendMail(email, function(error, info) {
    if (error) {
      res.status('401').json({
        err: info
      });
    } else {
      res.status('200').json({
        success: true
      });
    }
  });

};
