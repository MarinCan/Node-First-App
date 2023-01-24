const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// CONTACT PAGE
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'contact' });
});

// ABOUT PAGE
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});

module.exports = router;
