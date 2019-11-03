import { Router } from 'express';

const router = Router();

/* GET Graph page. */
router.get('/', function(req, res, next) {
  // Temporary for now. It works.
  // Need to figure out how to load a file now.
  // In a separate directory.
  res.sendFile('index.html');
});

module.exports = router;
