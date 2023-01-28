const express = require('express');
const router = express.Router();
const nodeMail = require("nodemailer");

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

// MANDAR EMAIL:
async function mainMail(email, message) {
  const transporter = await nodeMail.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOption = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: "Pruebas Email",
    text: message
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}

// POST para enviar email
router.post("/contact", async (req, res, next) => {
  const user_email = req.body.email
  const user_message = req.body.message
  // console.log(user_email)
  // console.log(user_message)
  try {
    await mainMail(user_email, user_message);
    res.send("Message Successfully Sent!");
  } 
  catch (error) {
    res.send("No se ha podido mandar el mensaje");
  }
});

module.exports = router;
