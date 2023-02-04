const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ABOUT PAGE
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});

// CONTACT PAGE
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'contact' });
});


// // POST para enviar email
router.post("/contact", (req, res, next) => {
  const user_email = req.body.email
  const user_message = req.body.message
  // console.log(user_email)
  // console.log(user_message)

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }

  });

  var mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'Email Formulario Contact',
    text: `${user_email} ha mandado el siguiente mensaje: ${user_message}` 
  };

  transporter.sendMail(mailOptions,(err,res)=>{
    if(err){
      console.log(err);
    }
    else {
      console.log('Mensaje enviado');
    }
  });

  res.redirect('/send-email')

});

// EMAIL MANDADO PAGE
router.get('/send-email', function(req, res, next) {
  res.render('email_mandado', { title: 'Email mandado' });
});

module.exports = router;
