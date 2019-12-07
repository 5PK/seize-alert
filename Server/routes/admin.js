import { Router } from 'express';
var path = require('path');

const router = Router();


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'admin.html'));
});



module.exports = router;
