const express = require('express');
const router = express.Router();
const api = require('../tools/json_api/main')

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
    (api({data: req.body, action: 'read'})._id).toString()
  )
});

router.get('/store/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.body, 'read')
  )
});
router.post('/store/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.body, 'create')
  )
});
router.patch('/store/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.body, 'update')
  )
});
router.delete('/store/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.body, 'delete')
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
