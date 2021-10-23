var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
  });
});

router.get('/inscription', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    inscription: true
  });
});

router.post('/inscription', function(req, res, next) {
  res.send(
    require('../tools/json_api/main')({data: req.body, action: 'create'})
  )
});

/* GET home page. */
router.get('/logged', function(req, res, next) {
  res.render('index', { title: 'Express', logged: true });
});

module.exports = router;
