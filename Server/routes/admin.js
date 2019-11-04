import { Router } from 'express';
var path = require('path');

const router = Router();


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'admin.html'));
});

router.get('/patients', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'patients.html'));
});

router.get('/patients/:patientid', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'patientDetail.html'));
});

router.get('/:graphId', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

module.exports = router;
