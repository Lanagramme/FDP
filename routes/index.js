const express = require('express');
const router = express.Router();

function new_route(accumulator, item) {
  accumulator[item.method](item.path, (req, res, next)=>{
    res.render('index', {
      title: 'Express',
      params: { get: req.query, post: req.body },
    });
  })
}

/* 
[
  {
    path: '/',
    method: 'get',
    page: 'index',
    data: {foo: 'bars'}
  }
].reduce(new_route, router)
 */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
  });
});
router.post('/', function(req, res, next) {
  res.send(
    require('../tools/json_api/main')({data: req.body, action: 'read'})
  )
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
router.all('/logged', function(req, res, next) {
  res.render('index', { title: 'Express', logged: true });
});

module.exports = router;
