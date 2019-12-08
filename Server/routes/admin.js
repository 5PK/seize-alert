import { Router } from 'express';
var path = require('path');

const router = Router();


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'admin.html'));
});

router.get('/noseizure', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'nonseizure.html'));
});

router.get('/seizure', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'seizure.html'));
});



module.exports = router;
