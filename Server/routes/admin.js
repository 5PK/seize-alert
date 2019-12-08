// Imports
import { Router } from 'express';
var path = require('path');
const router = Router();

// Main page.
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'admin.html'));
});

// no Seizure
router.get('/noseizure', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'nonseizure.html'));
});

// Seizure page
router.get('/seizure', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'seizure.html'));
});

module.exports = router;
