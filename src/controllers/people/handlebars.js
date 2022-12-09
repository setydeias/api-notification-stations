const resolve = require('path').resolve;
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const Mail = require('../../config/email/setydeias.com.br');

exports.getSend = (req, res, next) => {  

  const transporter = nodemailer.createTransport({
    host: Mail.config.host,
    port: Mail.config.port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: Mail.config.user,
        pass: Mail.config.pass,
    },
    tls: { rejectUnauthorized: false }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: resolve(__dirname, '../../templates/people'),
      defaultLayout: false,
    },
    viewPath: resolve(__dirname, '../../templates/people'),
    extName: ".handlebars",
  }
  
  transporter.use('compile', hbs(handlebarOptions));

  const options = {
    from: Mail.config.user,
    to: req.body.email,
    subject: 'Cadastrado',
    template: 'registration_confirmations',
    attachments: [
      { filename: 'CMB - Boleto.PDF', path: resolve(__dirname, '../../assets/imgs/CMB - Boleto.pdf') },
    ],    
    context: {
      title: 'Cadastrado',
      text: '',
      people: req.body.people,
      email: req.body.email,
      user: req.body.user,
      password: req.body.password,
    }
  }
  
  transporter.sendMail(
    options
  ).then(info=>{
    res.send(info);
  }).catch(error => {
    res.send(error);
  })
}
