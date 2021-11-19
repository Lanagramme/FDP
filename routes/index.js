const express = require('express');
const router = express.Router();
const api = require('../tools/json_api/main')

function new_route(item) {
  this[item.method](item.path, (req, res, next)=>{
    res.render('index', {
      title: item.name,
      params: { get: req.query, post: req.body },
      ... (item.data||{})
    });
  })
}


[
  {
    path: '/',
    method: 'get',
    name: 'Express',
    page: 'index',
    data: {page: 'signin'}
  },
  {
    path: '/home',
    method: 'get',
    name: 'Express',
    page: 'index',
    data: {home: true}
  },
  {
    path: '/inscription',
    method: 'get',
    name: 'Express',
    page: 'index',
    data: {page: 'signup'}
  },
  {
    path: '/logged',
    method: 'get',
    name: 'Express',
    page: 'index',
    data: {logged: true}
  },
].forEach( new_route.bind(router) )


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {
//     title: 'Express',
//     page: 'signin'
//   });
// });

// router.get('/home', function(req, res, next) {
//   res.render('index', {
//     title: 'Express',
//     home: true
//   });
// });



// router.get('/inscription', function(req, res, next) {
//   res.render('index', {
//     title: 'Express',
//     page: 'signup'
//   });
// });


// /* GET home page. */
// router.all('/logged', function(req, res, next) {
//   res.render('index', { title: 'Express', logged: true });
// });

router.post('/', function(req, res, next) {
  res.send(
    (api({data: req.body, action: 'read'})._id).toString()
  )
});

router.get('/store/*', function(req, res, next) {
  res.send(
    api(req.params[0].split('/'), req.query, 'read')
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

module.exports = router;
